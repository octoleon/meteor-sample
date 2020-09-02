import { compose, withProps } from "recompose";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Meteor } from "meteor/meteor";
import { Cart } from "/lib/collections";
import { getPrimaryMediaForOrderItem } from "/lib/api";
import { Reaction } from "/client/api";
import CartReview from "../components/cartReview";

// event handlers to pass in as props
const handlers = {
  handleImage(item) {
    const media = getPrimaryMediaForOrderItem(item);
    return media && media.url({ store: "small" });
  }
};

// reactive Tracker wrapped function
function composer(props, onData) {
  const userId = Meteor.userId();
  const shopId = Reaction.marketplace.merchantCarts ? Reaction.getShopId() : Reaction.getPrimaryShopId();
  const cart = Cart.findOne({ userId, shopId });
  if (!cart) return;

  Meteor.subscribe("CartImages", cart._id);

  const productItems = cart && cart.items;
  onData(null, {
    productItems
  });
}

// register the containers
registerComponent("CartReview", CartReview, [
  withProps(handlers),
  composeWithTracker(composer)
]);

export default compose(
  withProps(handlers),
  composeWithTracker(composer)
)(CartReview);
