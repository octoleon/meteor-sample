import { Template } from "meteor/templating";
import ManageMainMenuContainer from '../containers/ManageMainMenuContainer';

Template.manageMainMenu.helpers({
  ManageMainMenuContainer () {
    return ManageMainMenuContainer;
  }
})
