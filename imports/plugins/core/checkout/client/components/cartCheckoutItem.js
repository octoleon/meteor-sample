import React, { Component } from "react";
import PropTypes from "prop-types";
import { registerComponent } from "@reactioncommerce/reaction-components";

class CartCheckoutItem extends Component {
  static propTypes = {
    handleImage: PropTypes.func,
    item: PropTypes.object,
  }

  render() {
    const {
      handleImage,
      item
    } = this.props;

    const mediaUrl = handleImage(item);

    // Customization - include colorName and hexCode bg if applicable
    const productImageStyle = {
      backgroundImage: `url('${mediaUrl || ''}')`
    };
    if (item.colorHexCode) {
      productImageStyle.backgroundColor = `#${item.colorHexCode}`;
    }
    if (item.hexColor) {
      productImageStyle.backgroundColor = `#${item.hexColor}`;
    }

    return (
      <div className="cart-item">
        <div className="left w-col-6">
          <div className="image">
            {mediaUrl ?
              <div className="center-cropped" style={ productImageStyle }>
                <img src={mediaUrl} className="product-grid-item-images img-responsive" alt="" />
              </div> :
              <div className="center-cropped" style={{ backgroundImage: "url('/resources/placeholder.gif')" }}>
                <img src="/resources/placeholder.gif" className="product-grid-item-images img-responsive" alt="" />
              </div>
            }
          </div>
          <div className="cart-detail">
            <div className="cart-detail-row">
              <label>{item.title}</label>
            </div>
            <div className="cart-detail-row">
              <label>Size:</label> <span>{item.variants.title}</span>
            </div>
            <div className="cart-detail-row">
              <label>Color:</label> <span>{item.colorName}</span>
            </div>
            <div className="cart-detail-row">
              <label>Quantity:</label> <span>{item.quantity}</span>
            </div>
          </div>
        </div>
        <div className="right w-col-6">
          <label>${item.variants.price}</label>
        </div>        
      </div>
    );
  }
}

registerComponent("CartCheckoutItem", CartCheckoutItem);

export default CartCheckoutItem;
