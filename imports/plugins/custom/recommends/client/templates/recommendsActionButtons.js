import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

Template.recommendsActionButtons.events({
  'click .edit' (e) {
    e.preventDefault();
    Session.set('Recommends.editRecommend', this);
  },

  'click .delete' (e) {
    e.preventDefault();
    Session.set('Recommends.deleteId', this._id);
  }
});
