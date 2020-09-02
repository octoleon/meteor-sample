import { Template } from "meteor/templating";
import ColorHousesContainer from '../containers/ColorHousesContainer';

Template.colorHouses.helpers({
  ColorHousesContainer () {
    return ColorHousesContainer;
  }
});
