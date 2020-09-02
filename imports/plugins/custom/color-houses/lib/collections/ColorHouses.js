import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const ColorHouses = new Mongo.Collection('ColorHouses');

ColorHouses.schema = new SimpleSchema({
  title: {
    type: String
  },
  description: {
    type: String,
    optional: true
  },
  imageFileId: {
    type: String,
    optional: true
  },
  imageFileName: {
    type: String,
    optional: true
  },
  colorHouseTag: {
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

export default ColorHouses;
