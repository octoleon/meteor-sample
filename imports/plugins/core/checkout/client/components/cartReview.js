import React from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";

const CartReview = ({ productItems, handleImage }) => (
  <div className="cart-review">
    <div className="cart-items">
      {productItems.map((item) => (        
        <Components.CartCheckoutItem
          key={item._id}
          item={item}
          handleImage={handleImage}
        />        
      ))}
    </div>
    <div className="w-col-6" style={{ float: 'right' }}>
      <Components.CartSubTotal />
    </div>
  </div>  
);

CartReview.propTypes = {  
  handleImage: PropTypes.func,  
  productItems: PropTypes.array
};

export default CartReview;
