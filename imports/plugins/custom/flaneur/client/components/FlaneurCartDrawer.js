/**
 * @file
 * Customized cart drawer - added ShareCartLink.
 * Search for "customization" to see any changes made from core file.
 */

import React from "react";
import PropTypes from "prop-types";
import { Components, replaceComponent } from "@reactioncommerce/reaction-components";
// Customization import and include ShareCartLink component
import ShareCartLink from './ShareCartLink';

const FlaneurCartDrawer = ({ hideCheckout, productItems, pdpPath, handleRemoveItem, handleCheckout, handleImage, handleLowInventory, handleShowProduct }) => (
  <div>
      <a href="#" onClick={()=>{ FlaneurCartDrawer('hide'); }} className="side-button">Chat</a>
    <div className="cart-drawer-swiper-container">
      <div className="cart-drawer-swiper-wrapper">
        <div className="cart-drawer-swiper-slide">
          <Components.CartSubTotal />
            <div className="cart-items"><Components.Button
            bezelStyle="solid"
            className={{
              "btn-primary": true,
              "btn-block": true
            }}
            status="cta"
            id="btn-checkout"
            label="CHECKOUT"
            i18nKeyLabel="cartDrawer.checkout"
            onClick={handleCheckout}
          /><ShareCartLink /></div>
        </div>
        {productItems.map((item) => (
          <div className="cart-drawer-swiper-slide" key={item._id}>
            <Components.CartItems
              item={item}
              pdpPath={pdpPath}
              handleLowInventory={handleLowInventory}
              handleImage={handleImage}
              handleRemoveItem={handleRemoveItem}
              handleShowProduct={handleShowProduct}
            />
          </div>
        ))}

      </div>
    </div>
    <div className="cart-drawer-pagination" />
    {
      !hideCheckout &&
      <div className="row">
        <Components.Button
          bezelStyle="solid"
          className={{
            "btn-lg": true,
            "btn-block": true
          }}
          status="cta"
          id="btn-checkout"
          label="CHECKOUT"
          i18nKeyLabel="cartDrawer.checkout"
          onClick={handleCheckout}
        />
      </div>
    }
  </div>
);

FlaneurCartDrawer.propTypes = {
  handleCheckout: PropTypes.func,
  handleImage: PropTypes.func,
  handleLowInventory: PropTypes.func,
  handleRemoveItem: PropTypes.func,
  handleShowProduct: PropTypes.func,
  pdpPath: PropTypes.func,
  productItems: PropTypes.array
};

replaceComponent('CartDrawer', FlaneurCartDrawer);
