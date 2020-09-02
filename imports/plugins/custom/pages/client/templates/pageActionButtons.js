import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

Template.pageActionButtons.events({
  'click .edit' (e) {
    e.preventDefault();
    Session.set('Pages.editPage', this);
  },

  'click .delete' (e) {
    e.preventDefault();
    Session.set('Pages.deleteId', this._id);
  }
});
