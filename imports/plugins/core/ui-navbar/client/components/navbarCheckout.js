import React from "react";
import NavBar from "../components/navbar";

const NavBarCheckout = (props, context) => {
  const visibility = {
    hamburger: true,
    brand: true,
    tags: true,
    search: true,
    notifications: true,
    languages: true,
    currency: true,
    mainDropdown: true,
    cartContainer: true
  };
  const newProps = {
    ...props,
    visibility
  };
  return React.createElement(NavBar, newProps, context);
};

export default NavBarCheckout;
