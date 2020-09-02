import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

Template.blogActionButtons.events({
  'click .edit' (e) {
    e.preventDefault();
    Session.set('BlogLinks.editBlogLink', this);
  },

  'click .delete' (e) {
    e.preventDefault();
    Session.set('BlogLinks.deleteId', this._id);
  }
});
