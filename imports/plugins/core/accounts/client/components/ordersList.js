import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";

/**
 * @summary React component to display an array of completed orders
 * @memberof Accounts
 * @extends {Component}
 * @property {Array} allOrdersInfo - array of orders
 * @property {Function} handeleDisplayMedia - function to display order image
 * @property {Boolean} isProfilePage - Profile or non-profile page
 */
class OrdersList extends Component {
  static propTypes = {
    allOrdersInfo: PropTypes.array,
    isProfilePage: PropTypes.bool,
    selectedOrderId: PropTypes.string
  }

  render() {
    const { allOrdersInfo, selectedOrderId } = this.props;
    if (allOrdersInfo) {
      return (
        <div>
          {allOrdersInfo.map((order, index) => {
            const orderKey = order.orderId;
            let isActive;
            if (selectedOrderId) {
              isActive = selectedOrderId === order.orderId;
            } else {
              isActive = index === 0;
            }

            return (
              <Components.CompletedOrder
                isActive={isActive}
                key={orderKey}
                index={index}
                shops={order.shops}
                order={order.order}
                orderSummary={order.orderSummary}
                paymentMethods={order.paymentMethods}
                isProfilePage={this.props.isProfilePage}
              />
            );
          })}
        </div>
      );
    }

    return (
      <div className="alert alert-info">
        <span data-i18n="cartCompleted.noOrdersFound">No orders found.</span>
      </div>
    );
  }
}

export default OrdersList;
