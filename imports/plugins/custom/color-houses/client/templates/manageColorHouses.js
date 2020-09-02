import { Template } from "meteor/templating";
import ManageColorHousesContainer from '../containers/ManageColorHousesContainer';

Template.manageColorHouses.helpers({
  ManageColorHousesContainer () {
    return ManageColorHousesContainer;
  }
});
