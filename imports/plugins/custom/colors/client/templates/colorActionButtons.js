import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

Template.colorActionButtons.events({
  'click .edit' (e) {
    e.preventDefault();
    Session.set('Colors.editColor', this);
  },

  'click .delete' (e) {
    e.preventDefault();
    Session.set('Colors.deleteId', this._id);
  }
});
