/**
 * @file
 * Customized core RC methods
 */

import Random from "@reactioncommerce/random";
import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import * as Collections from "/lib/collections";
import { Hooks, Logger, Reaction } from "/server/api";
import { Colors } from '/imports/plugins/custom/colors/lib/collections';

/**
 * @method quantityProcessing
 * @private
 * @summary Perform calculations admissibility of adding product to cart
 * @param {Object} product - product to add to Cart
 * @param {Object} variant - product variant
 * @param {Number} itemQty - qty to add to cart, defaults to 1, deducts
 *  from inventory
 * @since 1.10.1
 * @return {Number} quantity - revised quantity to be added to cart
 */
function quantityProcessing(product, variant, itemQty = 1) {
  let quantity = itemQty;
  const MIN = variant.minOrderQuantity || 1;
  const MAX = variant.inventoryQuantity || Infinity;

  if (variant.inventoryPolicy && MIN > MAX) {
    Logger.debug(`productId: ${product._id}, variantId ${variant._id
    }: inventoryQuantity lower then minimum order`);
    throw new Meteor.Error("invalid-parameter", `productId: ${product._id}, variantId ${variant._id
    }: inventoryQuantity lower then minimum order`);
  }

  // TODO: think about #152 implementation here
  switch (product.type) {
    case "not-in-stock":
      break;
    default: // type: `simple` // todo: maybe it should be "variant"
      if (quantity < MIN) {
        quantity = MIN;
      } else if (variant.inventoryPolicy && quantity > MAX) {
        quantity = MAX;
      }
  }

  return quantity;
}

Meteor.methods({

  /**
   *  Customization - Customized core cart/addToCart method to support including
   *  a color with each cart item.
   *  @method cart/addToCart
   *  @summary Add items to a user cart. When we add an item to the cart,
   *  we want to break all relationships with the existing item.
   *  We want to fix price, qty, etc into history.
   *  However, we could check reactively for price /qty etc, adjustments on the original and notify them.
   *  @memberof Methods/Cart
   *  @param {String} productId - productId to add to Cart
   *  @param {String} variantId - product variant _id
   *  @param {Number} [itemQty] - qty to add to cart
   *  @param {Object} additionalOptions
   *  @param {String} additionalOptions.colorId - Customization - _id of color
   *    user is ordering product in, if applicable
   *  @param {String} additionalOptions.hexColor - Define if product is
   *    Capsule product in admin-defined color
   *  @return {Number|Object} Mongo insert response
   */
  "flaneurCart/addToCart" (productId, variantId, itemQty, additionalOptions = {}) {
    check(productId, String);
    check(variantId, String);
    check(itemQty, Match.Optional(Number));

    check(additionalOptions, Object);
    const { colorId, hexColor } = additionalOptions;
    check(colorId, Match.Optional(String));
    check(hexColor, Match.Optional(String));

    const options = {
      overwriteExistingMetafields: false, // Allows updating of metafields on quantity change
      metafields: undefined, // Array of MetaFields to set on the CartItem
    };

    const cart = Collections.Cart.findOne({ userId: this.userId });
    if (!cart) {
      Logger.error(`Cart not found for user: ${this.userId}`);
      throw new Meteor.Error(
        "invalid-parameter",
        "Cart not found for user with such id"
      );
    }

    // Customization - validate color if supplied
    let color;
    if (colorId) {
      color = Colors.findOne(colorId);
      if (!color) {
        throw new Meteor.Error('invalid-parameter', 'Color with supplied _id not found');
      }
    }

    // With the flattened model we no longer need to work directly with the
    // products. But product still could be necessary for a `quantityProcessing`
    // TODO: need to understand: do we really need product inside
    // `quantityProcessing`?
    let product;
    let variant;
    Collections.Products.find({
      _id: {
        $in: [
          productId,
          variantId
        ]
      }
    }).forEach((doc) => {
      if (doc.type === "simple") {
        product = doc;
      } else {
        variant = doc;
      }
    });

    // TODO: this lines still needed. We could uncomment them in future if
    // decide to not completely remove product data from this method
    // const product = Collections.Products.findOne(productId);
    // const variant = Collections.Products.findOne(variantId);
    if (!product) {
      Logger.warn(`Product: ${productId} was not found in database`);
      throw new Meteor.Error(
        "not-found",
        "Product with such id was not found"
      );
    }
    if (!variant) {
      Logger.warn(`Product variant: ${variantId} was not found in database`);
      throw new Meteor.Error(
        "not-found",
        "ProductVariant with such id was not found"
      );
    }
    // performs calculations admissibility of adding product to cart
    const quantity = quantityProcessing(product, variant, itemQty);
    // performs search of variant inside cart

    // Customization, check for existing product/variant/color in cart
    // If existing, simply update quantity in cart, otherwise add (existing functionality)
    // Customization is color check
    const cartVariantExists = cart.items && cart.items.some((item) => {
      const doesVariantExist = item.variants._id === variantId;
      if (colorId) {
        const doesColorExist = item.colorId === colorId;
        return doesVariantExist && doesColorExist;
      } else {
        return doesVariantExist;
      }
    });

    if (cartVariantExists) {
      let modifier = {};

      // Allows for updating metafields on an existing item when the quantity also changes
      if (options.overwriteExistingMetafields) {
        modifier = {
          $set: {
            "items.$.metafields": options.metafields
          }
        };
      }

      let updateResult;

      try {
        // Customization - take colorId into account when updating quantity, if applicable
        const updateSelector = {
          "_id": cart._id,
          "items": {
            $elemMatch: {
              "product._id": productId,
              "variants._id": variantId
            }
          }
        };
        if (colorId) {
          updateSelector.items.$elemMatch.colorId = colorId;
        }

        updateResult = Collections.Cart.update(updateSelector, {
          $inc: {
            "items.$.quantity": quantity
          },
          ...modifier
        });
      } catch (error) {
        Logger.error("Error adding to cart.", error);
        Logger.error(
          "Error adding to cart. Invalid keys:",
          Collections.Cart.simpleSchema().namedContext().validationErrors()
        );
        throw error;
      }

      // Update inventory
      Hooks.Events.run("afterModifyQuantityInCart", cart._id, { productId, variantId });
      // Calculate discounts
      Hooks.Events.run("afterCartUpdateCalculateDiscount", cart._id);
      // refresh shipping quotes
      Meteor.call("shipping/updateShipmentQuotes", cart._id);
      // revert workflow to checkout shipping step.
      Meteor.call("workflow/revertCartWorkflow", "coreCheckoutShipping");
      // reset selected shipment method
      Meteor.call("cart/resetShipmentMethod", cart._id);
      // Calculate taxes
      Hooks.Events.run("afterCartUpdateCalculateTaxes", cart._id);

      Logger.debug(`cart: increment variant ${variantId} quantity by ${quantity}`);

      return updateResult;
    }

    // TODO: Handle more than 2 levels of variant hierarchy for determining parcel dimensions
    // we need to get the parent of the option to check if parcel info is stored there
    const immediateAncestors = variant.ancestors.filter((ancestor) => ancestor !== product._id);
    const immediateAncestor = Collections.Products.findOne({ _id: immediateAncestors[0] });
    let parcel = null;
    if (immediateAncestor) {
      if (immediateAncestor.weight || immediateAncestor.height || immediateAncestor.width || immediateAncestor.length) {
        parcel = { weight: immediateAncestor.weight, height: immediateAncestor.height, width: immediateAncestor.width, length: immediateAncestor.length };
      }
    }
    // if it's set at the option level then that overrides
    if (variant.weight || variant.height || variant.width || variant.length) {
      parcel = { weight: variant.weight, height: variant.height, width: variant.width, length: variant.length };
    }
    // cart variant doesn't exist
    let updateResult;
    const newItemId = Random.id();

    try {
      // Customization - include colorId and colorName if applicable,
      // Or Capsule product's admin-defined hex code if applicable
      const newCartItem = {
        _id: newItemId,
        shopId: product.shopId,
        productId,
        quantity,
        product,
        variants: variant,
        metafields: options.metafields,
        title: product.title,
        type: product.type,
        parcel
      };

      if (colorId) {
        Object.assign(newCartItem, {
          colorId: color._id,
          colorName: color.name,
          colorHexCode: color.hexCode
        });
      }

      if (hexColor) {
        Object.assign(newCartItem, { hexColor });
      }

      updateResult = Collections.Cart.update({
        _id: cart._id
      }, {
        $addToSet: {
          items: newCartItem
        }
      });
    } catch (error) {
      Logger.error("Error adding to cart.", error);
      Logger.error(
        "Error adding to cart. Invalid keys:",
        Collections.Cart.simpleSchema().namedContext().validationErrors()
      );
      throw error;
    }

    // Update add inventory reserve
    Hooks.Events.run("afterAddItemsToCart", cart._id, { newItemId });
    // Calculate discounts
    Hooks.Events.run("afterCartUpdateCalculateDiscount", cart._id);
    // refresh shipping quotes
    Meteor.call("shipping/updateShipmentQuotes", cart._id);
    // revert workflow to checkout shipping step.
    Meteor.call("workflow/revertCartWorkflow", "coreCheckoutShipping");
    // reset selected shipment method
    Meteor.call("cart/resetShipmentMethod", cart._id);
    // Calculate taxes
    Hooks.Events.run("afterCartUpdateCalculateTaxes", cart._id);

    Logger.debug(`cart: add variant ${variantId} to cartId ${cart._id}`);

    return updateResult;
  },
});
