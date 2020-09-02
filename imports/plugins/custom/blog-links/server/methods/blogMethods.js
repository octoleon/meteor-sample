import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Reaction } from '/server/api';
import { BlogLinks } from '../../lib/collections';

const validateBlogLink = function ({
  title,
  description,
  url,
  imageFileId,
  imageFileName
}) {
  check(title, String);
  check(description, String);
  check(url, String);
  check(imageFileId, String);
  check(imageFileName, String);

  if (title === '') {
    throw new Meteor.Error(400, 'Title is required');
  }
  if (description === '') {
    throw new Meteor.Error(400, 'Description is required');
  }
  if (url === '') {
    throw new Meteor.Error(400, 'URL is required');
  }
}

Meteor.methods({
  'BlogLinks.create' (fields) {
    check(fields, Object);
    const {
      title,
      description,
      url,
      imageFileId,
      imageFileName
    } = fields;

    validateBlogLink({ title, description, url, imageFileId, imageFileName });

    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    if (Reaction.hasAdminAccess() === false) {
      throw new Meteor.Error(403, 'You do not have admin permissions');
    }

    const existingByURL = BlogLinks.findOne({ url }, { fields: { _id: 1 }});
    if (existingByURL) {
      throw new Meteor.Error(400, 'A blog link with the URL you specified already exists');
    }

    BlogLinks.insert({
      title,
      description,
      url,
      imageFileId,
      imageFileName,
      createdAt: new Date()
    });
  },

  'BlogLinks.update' (fields) {
    check(fields, Object);
    const {
      _id,
      title,
      description,
      url,
      imageFileId,
      imageFileName
    } = fields;

    validateBlogLink({ title, description, url, imageFileId, imageFileName });

    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    if (Reaction.hasAdminAccess() === false) {
      throw new Meteor.Error(403, 'You do not have admin permissions');
    }

    if (_id === '') {
      throw new Meteor.Error(400, 'No _id supplied');
    }

    const blogLink = BlogLinks.findOne(_id);
    if (!blogLink) {
      throw new Meteor.Error(404, 'Blog link not found');
    }

    const existingByURL = BlogLinks.findOne({
      url,
      _id: {
        $ne: _id
      }
    }, { fields: { _id: 1 }});
    if (existingByURL) {
      throw new Meteor.Error(400, 'A blog link with the URL you specified already exists');
    }

    BlogLinks.update(_id, {
      $set: {
        title,
        description,
        url,
        imageFileId,
        imageFileName,
        updatedAt: new Date()
      }
    });
  },

  'BlogLinks.delete' (_id) {
    check(_id, String);

    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    if (Reaction.hasAdminAccess() === false) {
      throw new Meteor.Error(403, 'You do not have admin permissions');
    }

    if (_id === '') {
      throw new Meteor.Error(400, 'No _id supplied');
    }

    BlogLinks.remove(_id);
  }
})
