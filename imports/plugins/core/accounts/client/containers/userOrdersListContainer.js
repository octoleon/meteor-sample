import { compose } from "recompose";
import { Meteor } from "meteor/meteor";
import { Router } from "/client/modules/router/";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import OrdersList from "../components/ordersList";

function composer(props, onData) {
  // Get user order from props
  const { orders } = props;
  const allOrdersInfo = [];
  let isProfilePage = false;

  if (Router.getRouteName() === "account/profile") {
    isProfilePage = true;
  }

  // @FIXME double check how to get hash via Router object
  const selectedOrderId = (window.location.hash || '').split('orders#')[1];

  if (orders.length > 0) {
    orders.map((order) => {
      const imageSub = Meteor.subscribe("OrderImages", order._id);
      const orderSummary = {
        quantityTotal: order.getCount(),
        subtotal: order.getSubTotal(),
        shippingTotal: order.getShippingTotal(),
        tax: order.getTaxTotal(),
        discounts: order.getDiscounts(),
        total: order.getTotal(),
        shipping: order.shipping
      };
      if (imageSub.ready()) {
        const orderId = order._id;
        const orderInfo = {
          shops: order.getShopSummary(),
          order,
          orderId,
          orderSummary,
          paymentMethods: order.getUniquePaymentMethods()
        };
        allOrdersInfo.push(orderInfo);
      }
      return allOrdersInfo;
    });
    onData(null, {
      allOrdersInfo,
      isProfilePage,
      selectedOrderId
    });
  } else {
    onData(null, {
      orders,
      isProfilePage,
      selectedOrderId
    });
  }
}

registerComponent("OrdersList", OrdersList, [
  composeWithTracker(composer)
]);

export default compose(composeWithTracker(composer))(OrdersList);
