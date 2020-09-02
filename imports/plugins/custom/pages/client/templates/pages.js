import { Template } from "meteor/templating";
import PagesContainer from '../containers/PagesContainer';

Template.pages.helpers({
  PagesContainer () {
    return PagesContainer;
  }
})
