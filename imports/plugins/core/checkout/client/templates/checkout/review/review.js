import "./review.html";
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Components } from "@reactioncommerce/reaction-components";

/**
* review status
* trigger checkoutPayment step on template checkoutReview render
*/

Template.checkoutReview.onRendered(() => {
  Meteor.call("workflow/pushCartWorkflow", "coreCartWorkflow", "checkoutReview");
});

Template.checkoutReview.helpers({
  CartReviewContainer() {
    return Components.CartReview;
  }
});
