import { Template } from "meteor/templating";
import ManageHomepageBannerContainer from '../containers/ManageHomepageBannerContainer';

Template.manageHomepageBanner.helpers({
  ManageHomepageBannerContainer () {
    return ManageHomepageBannerContainer;
  }
});
