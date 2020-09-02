import { Meteor } from "meteor/meteor";
import { Logger, MethodHooks } from "/server/api";
import { Catalog, Products, Shops } from "/lib/collections";

/**
 * This hook copies over the extended schema fields for a Flaneur Product to the catalog when published
 * This does not currently work because a bug in Reaction 1.13.1 runs this before the actual method
 * See https://github.com/reactioncommerce/reaction/pull/4537
 * Needed to bring in fix from Reaction 1.14.1+ to server/api/method-hooks.js
 */
MethodHooks.after("catalog/publish/products", (options) => {
  options.arguments[0].forEach(productId => {
    const product = Products.findOne(productId);

    if (!product) {
      Logger.info("Cannot publish to catalog: undefined product");
      return false;
    }

    if (Array.isArray(product.ancestors) && product.ancestors.length) {
      Logger.info("Cannot publish to catalog: product is a variant");
      return false;
    }

    const shop = Shops.findOne(
      { _id: product.shopId },
      {
        fields: {
          currencies: 1,
          currency: 1
        }
      }
    );
    if (!shop) {
      Logger.info(`Cannot publish to catalog: product's shop (ID ${product.shopId}) not found`);
      return false;
    }

    Catalog.update({"product.productId": productId}, {$set: {
      "product.careInstructions": product.careInstructions,
      "product.dimensions": product.dimensions,
      "product.specs": product.specs,
      "product.pageContent": product.pageContent,
      "product.pageContentTop": product.pageContentTop,
      "product.hexColor": product.hexColor,
      "product.template": product.template
    }})
  });
});
