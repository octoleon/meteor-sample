import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

Template.colorHouseActionButtons.events({
  'click .edit' (e) {
    e.preventDefault();
    Session.set('ColorHouses.editColorHouse', this);
  },

  'click .delete' (e) {
    e.preventDefault();
    Session.set('ColorHouses.deleteId', this._id);
  }
});
