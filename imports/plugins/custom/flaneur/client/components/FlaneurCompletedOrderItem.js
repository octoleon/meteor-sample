/**
 * @file
 * Customized core CompletedOrderItem component
 * Added item color, if applicable
 */

import React from "react";
import PropTypes from "prop-types";
import { getPrimaryMediaForOrderItem } from "/lib/api";
import { Components, registerComponent } from "@reactioncommerce/reaction-components";

/**
 * @summary Shows the individual line items for a completed order
 * @param {Object} props - React PropTypes
 * @property {Object} item - An object representing each item on the order
 * @return {Node} React node containing each line item on an order
 */
const FlaneurCompletedOrderItem = ({ item }) => {
  // Customization - color
  const { colorHexCode, hexColor } = item;
  const hexCode = colorHexCode || hexColor;
  const productImageStyle = hexCode && {
    backgroundColor: `#${hexCode}`
  } || {};
  return (
    <div className="row order-details-line">
      <div className="order-details-media" style={productImageStyle}>
        <Components.ProductImage
          item={item}
          displayMedia={getPrimaryMediaForOrderItem}
          size="small"
          badge={false}
        />
      </div>
      <div className="order-details-title">
        {item.product.title}
        <p>
          {item.variants.title}
          {item.colorName && ` - ${item.colorName}` || ''}
        </p>
      </div>
      <div className="order-details-quantity"><span>{item.quantity}</span></div>
      <div className="order-details-price"><Components.Currency amount={item.variants.price} /></div>
    </div>
  );
};

FlaneurCompletedOrderItem.propTypes = {
  item: PropTypes.object
};

registerComponent("CompletedOrderItem", FlaneurCompletedOrderItem);

export default FlaneurCompletedOrderItem;
