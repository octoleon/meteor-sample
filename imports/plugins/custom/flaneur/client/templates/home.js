import { Template } from "meteor/templating";
import HomeContainer from '../containers/HomeContainer.js';

Template.home.helpers({
  HomeContainer () {
    return HomeContainer;
  }
});
