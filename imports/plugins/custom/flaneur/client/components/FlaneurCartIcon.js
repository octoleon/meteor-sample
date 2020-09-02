/**
 * @file
 * Customized Reaction Commerc core CartIcon component.
 * Replaced button w/ simple link.
 */

import React from "react";
import PropTypes from "prop-types";
import { Components, replaceComponent } from "@reactioncommerce/reaction-components";

const FlaneurCartIcon = ({ handleClick, cart }) => (
  <a
    href="javascript:void(0)"
    id="header-cart-link"
    onClick={handleClick}
  >
    <img src='https://uploads-ssl.webflow.com/5bb3c7462318764598407e29/5c37960a996f279f3ed60583_shoppingcart.png'/> ({cart ? cart.getCount() : 0})
  </a>
);

FlaneurCartIcon.propTypes = {
  cart: PropTypes.object,
  handleClick: PropTypes.func.isRequired
};

replaceComponent('CartIcon', FlaneurCartIcon);

export default FlaneurCartIcon;
