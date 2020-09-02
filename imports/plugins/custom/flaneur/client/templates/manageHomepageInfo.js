import { Template } from "meteor/templating";
import ManageHomepageInfoContainer from '../containers/ManageHomepageInfoContainer';

Template.manageHomepageInfo.helpers({
  ManageHomepageInfoContainer () {
    return ManageHomepageInfoContainer;
  }
});
