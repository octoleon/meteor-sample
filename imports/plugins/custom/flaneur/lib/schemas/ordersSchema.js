import SimpleSchema from "simpl-schema";
import { CartItem, OrderDocument, OrderItem } from '/lib/collections/schemas';

const ExtendedOrderItem = OrderItem.clone().extend({
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

OrderDocument.extend({
  flaneurNotes: {
    type: Array,
    optional: true
  },
  'flaneurNotes.$': Object,
  'flaneurNotes.$.userId': String,
  'flaneurNotes.$.userName': String,
  'flaneurNotes.$.text': String,
  'flaneurNotes.$.createdAt': String,
  'items.$': CartItem.clone().extend(ExtendedOrderItem)
});
