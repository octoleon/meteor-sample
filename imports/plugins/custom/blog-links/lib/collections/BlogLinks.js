import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const BlogLinks = new Mongo.Collection('BlogLinks');

BlogLinks.schema = new SimpleSchema({
  title: {
    type: String
  },
  imageFileId: {
    type: String,
    optional: true
  },
  imageFileName: {
    type: String,
    optional: true
  },
  description: {
    type: String
  },
  url: {
    type: String
  },
  createdAt: {
    type: Date,
    optional: true
  },
  updatedAt: {
    type: Date,
    optional: true
  }
});

export default BlogLinks;
