import { Meteor } from 'meteor/meteor';
import { Reaction } from '/server/api';
import { check } from 'meteor/check';
import { Pages } from '../../lib/collections';

Meteor.methods({
  'Pages.create' (fields) {
    check(fields, Object);
    const {
      title,
      body,
      path,
      description,
      isPublished
    } = fields;
    check(title, String);
    check(body, String);
    check(path, String);
    check(description, String);
    check(isPublished, Boolean);

    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    if (Reaction.hasAdminAccess() === false) {
      throw new Meteor.Error(403, 'You do not have admin permissions.');
    }

    if (title === '') {
      throw new Meteor.Error(400, 'Enter at least a title to continue.');
    }

    Pages.insert({
      title,
      body,
      path,
      description,
      isPublished,
      createdAt: new Date()
    });
  },

  'Pages.update' (fields) {
    check(fields, Object);
    const {
      _id,
      title,
      body,
      path,
      description,
      isPublished
    } = fields;
    check(_id, String);
    check(title, String);
    check(body, String);
    check(path, String);
    check(description, String);
    check(isPublished, Boolean);

    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    if (Reaction.hasAdminAccess() === false) {
      throw new Meteor.Error(403, 'You do not have admin permissions.');
    }

    if (_id === '') {
      throw new Meteor.Error(400, 'No _id supplied');
    }

    const page = Pages.findOne(_id);
    if (!page) {
      throw new Meteor.Error(404, 'Page not found');
    }

    Pages.update(_id, {
      $set: {
        title,
        body,
        path,
        description,
        isPublished,
        updatedAt: new Date()
      }
    });
  },

  'Pages.delete' (_id) {
    check(_id, String);

    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    if (Reaction.hasAdminAccess() === false) {
      throw new Meteor.Error(403, 'You do not have admin permissions.');
    }

    if (_id === '') {
      throw new Meteor.Error(400, 'No _id supplied');
    }

    Pages.remove(_id);
  },

  'Pages.get' (path) {
    check(path, String);

    return Pages.findOne({ path, isPublished: true }, {
      fields: {
        title: 1,
        body: 1,
        description: 1
      }
    });
  }
});
