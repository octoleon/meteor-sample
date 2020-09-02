import { Template } from "meteor/templating";
import { Components } from "@reactioncommerce/reaction-components";

/**
 * Single Order form for instance where guest login is needed.
 */

Template.singleOrder.helpers({
  singleOrderComponent() {
    return {
      component: Components.SingleOrder
    };
  }
});
