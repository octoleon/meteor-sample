import { Template } from "meteor/templating";
import ColorsContainer from '../containers/ColorsContainer';

Template.colors.helpers({
  ColorsContainer () {
    return ColorsContainer;
  }
});
