import React, { Component } from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";
import SingleOrder from "../components/singleOrder";
import { Router } from "/client/api";

class SingleOrderContainer extends Component {
  /**
   * @method handleOrderSubmit
   * @summary Handle submitting the orderId form
   * @param {Event} event - the event that fired
   * @param {String} orderId - anonymous user's orderId
   * @return {undefined} undefined
   * @private
   */
  handleOrderIdSubmit = (event, orderId) => {
    event.preventDefault();

    Router.go("/account/profile?orderId=" + orderId);
  }

  render() {
    const orderId = (window.location.hash || '').split('orders#')[1];

    return (
      <SingleOrder
        orderId={orderId || ''}
        handleOrderIdSubmit={this.handleOrderIdSubmit}
      />
    );
  }
}

registerComponent("SingleOrder", SingleOrderContainer);

export default SingleOrder;
