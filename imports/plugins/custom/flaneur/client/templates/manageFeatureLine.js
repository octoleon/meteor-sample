import { Template } from "meteor/templating";
import ManageFeatureLineContainer from '../containers/ManageFeatureLineContainer';

Template.manageFeatureLine.helpers({
  ManageFeatureLineContainer () {
    return ManageFeatureLineContainer;
  }
});
