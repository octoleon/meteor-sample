import { compose } from "recompose";
import { Meteor } from "meteor/meteor";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import StatusSingleOrder from "../components/statusSingleOrder";

function composer(props, onData) {
  // Get user order from props
  const { order } = props;

  if (order && order._id) {
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

      onData(null, {
        orderInfo
      });
    } else {
      onData(null, {
        order
      });
    }
  } else {
    onData(null, {
      order
    });
  }
}

registerComponent("StatusSingleOrder", StatusSingleOrder, [
  composeWithTracker(composer)
]);

export default compose(composeWithTracker(composer))(StatusSingleOrder);
