import React from "react";
import PropTypes from "prop-types";
import { $ } from "meteor/jquery";
import { Components, registerComponent } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api";

function handleKeepShopping(event) {
  event.stopPropagation();
  event.preventDefault();
  return $("#cart-drawer-container").fadeOut(100, () => Reaction.toggleSession("displayCart"));
}

const EmptyCartDrawer = () => (
  <div className="cart-drawer" id="cart-drawer">
    <div className="cart-drawer-empty">
      <div className="row cart-drawer-empty-msg">
      <div className="no-colors-message">Your Shopping Bag is empty.
      <ul className="help-row-swatch">
      <li className="help-swatchbook-book"><img src="https://fr-assets.com/images/180216_Sophie_0964-p-800.jpeg"/><a className="help-swatchbook" href="/capsule">Shop Color Capsules</a></li>
      <li className="help-swatchbook-book"><img src="https://fr-assets.com/images/Part-3-zipper-2-p-500.jpeg"/><a className="help-swatchbook" href="/color-houses">Explore Color Houses</a></li>
        <li className="help-swatchbook-book"><img src="https://fr-assets.com/images/Part-3-swatch-2-p-500.jpg"/><a className="help-swatchbook" href="/design-your-bedding">Design Bedding</a></li>
    </ul></div>
      </div>
      <div className="row">
        <a href="/color-houses"><Components.Button
          id="btn-keep-shopping"
          bezelStyle="solid"
          className="btn-lg btn-block"
          i18nKeyLabel="cartDrawer.keepShopping"
          label="Continue Shopping"

          status="cta"
        /></a>
      </div>
    </div>
  </div>
);

EmptyCartDrawer.propTypes = {
  keepShopping: PropTypes.func
};

registerComponent("EmptyCartDrawer", EmptyCartDrawer);

export default EmptyCartDrawer;
