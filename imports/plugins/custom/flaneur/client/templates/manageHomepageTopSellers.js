import { Template } from "meteor/templating";
import ManageHomepageTopSellersContainer from '../containers/ManageHomepageTopSellersContainer';

Template.manageHomepageTopSellers.helpers({
  ManageHomepageTopSellersContainer () {
    return ManageHomepageTopSellersContainer;
  }
});
