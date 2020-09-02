import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components, registerComponent } from "@reactioncommerce/reaction-components";
import { Router } from "/client/modules/router/";

/**
 * @summary React component to log in and see status of single order
 * @memberof Accounts
 * @extends {Component}
 * @property {Function} handleOrderIdSubmit - Required: Order ID submit function
 */
class StatusSingleOrder extends Component {
  static propTypes = {
    orderInfo: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { orderInfo } = this.props;
    if (!orderInfo) {
      return (
        <Components.NotFound
          i18nKeyTitle="order.notFound"
          icon="fa fa-barcode"
          title="Order Not Found"
        />
      );
    } else {
      let isProfilePage = false;
      if (Router.getRouteName() === "account/profile") {
        isProfilePage = true;
      }

      return (
        <div className="status-single-order">
          <Components.CompletedOrder
            isActive
            index={0}
            shops={orderInfo.shops}
            order={orderInfo.order}
            orderSummary={orderInfo.orderSummary}
            paymentMethods={orderInfo.paymentMethods}
            isProfilePage={isProfilePage}
          />
        </div>
      );
    }
  }
}

registerComponent("StatusSingleOrder", StatusSingleOrder);

export default StatusSingleOrder;
