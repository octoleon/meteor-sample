import { Template } from "meteor/templating";
import RecommendsContainer from '../containers/RecommendsContainer';

Template.recommends.helpers({
  RecommendsContainer () {
    return RecommendsContainer;
  }
});
