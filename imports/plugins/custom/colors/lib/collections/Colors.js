import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Colors = new Mongo.Collection('Colors');

Colors.schema = new SimpleSchema({
  name: {
    type: String
  },
  pantoneCode: {
    type: String
  },
  description: {
    type: String,
    optional: true
  },
  hexCode: {
    type: String
  },
  colorTag: {
    type: String,
    optional: true
  },
  slug: {
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

export default Colors;
