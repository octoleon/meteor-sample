import { Template } from "meteor/templating";
import ManageRecommendsContainer from '../containers/ManageRecommendsContainer';

Template.manageRecommends.helpers({
  ManageRecommendsContainer () {
    return ManageRecommendsContainer;
  }
});
