import { Template } from 'meteor/templating';
import { Router } from '/client/api';

Template.applyCartLink.onRendered(function () {
  const cartLinkId = Router.getParam('id');
  Meteor.call('Flaneur.applyCartLink', cartLinkId, (err) => {
    if (err) {
      alert(err.reason);
    } else {
      alert('Your cart has been updated, take a look!');
    }
    Router.go('/');
  });
});
