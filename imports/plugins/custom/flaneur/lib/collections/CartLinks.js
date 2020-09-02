import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const CartLinks = new Mongo.Collection('CartLinks');

CartLinks.schema = new SimpleSchema({
  userId: {
    type: String
  },
  items: {
    type: Object
  }
});

export default CartLinks;
