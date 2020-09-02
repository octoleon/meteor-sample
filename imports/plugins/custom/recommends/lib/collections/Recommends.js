import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Recommends = new Mongo.Collection('Recommends');

Recommends.schema = new SimpleSchema({
  colorName: {
    type: String,
    optional: false
  },
  description: {
    type: String,
    optional: true
  },
  colorIds: {
    type: Array,
    optional: true
  },
  'colorIds.$': {
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

export default Recommends;
