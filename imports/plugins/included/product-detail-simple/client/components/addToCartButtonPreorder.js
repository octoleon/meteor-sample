import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components, registerComponent } from "@reactioncommerce/reaction-components";

class AddToCartButtonPreorder extends Component {
  get hasVariants() {
    return Array.isArray(this.props.variants) && this.props.variants.length > 0;
  }

  handleCartQuantityChange = (event) => {
    if (this.props.onCartQuantityChange) {
      this.props.onCartQuantityChange(event, event.target.value);
    }
  }

  render() {
    if (this.hasVariants) {
      return (
        <div className="pdp add-to-cart block">
          <button
            className="input-group-addon add-to-cart-text js-add-to-cart"

            onClick={this.props.onClick || this.props.onAddToCart}
          >
          Preorder
          </button>
        </div>
      );
    }

    if (this.props.editable && this.hasVariants === false) {
      return (
        <Components.Alert>
          <Components.Translation defaultValue="Add options to enable 'Add to Cart' button" i18nKey="productVariant.addVariantOptions" />
        </Components.Alert>
      );
    }
    return null;
  }
}

AddToCartButtonPreorder.propTypes = {
  cartQuantity: PropTypes.number,
  editable: PropTypes.bool, // eslint-disable-line react/boolean-prop-naming
  onAddToCart: PropTypes.func,
  onCartQuantityChange: PropTypes.func,
  onClick: PropTypes.func,
  variants: PropTypes.arrayOf(PropTypes.object)
};

registerComponent("AddToCartButtonPreorder", AddToCartButtonPreorder);

export default AddToCartButtonPreorder;
