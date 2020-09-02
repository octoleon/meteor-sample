import { Cart } from '/lib/collections';
import SimpleSchema from 'simpl-schema';
import { CartItem } from '/lib/collections/schemas';

CartItem.extend({
  colorId: {
    type: String,
    optional: true
  },
  colorName: {
    type: String,
    optional: true
  },
  colorHexCode: {
    type: String,
    optional: true
  },
  hexColor: {
    type: String,
    optional: true
  }
});
