import { Products } from '/lib/collections';
import SimpleSchema from "simpl-schema";
import { Product } from '/lib/collections/schemas';
import { registerSchema } from "@reactioncommerce/schemas";

const ExtendedProductSchema = Product.clone().extend(
  {
    careInstructions: {
      type: String,
      optional: true
    },
    dimensions: {
      type: String,
      optional: true
    },
    specs: {
      type: String,
      optional: true
    },
    share: {
      type: String,
      optional: true
    },
    pageContent: {
      type: String,
      optional: true
    },
    pageContentTop: {
      type: String,
      optional: true
    },
    // Admin-defined color for PDP. If set, product is only displayed in that color
    hexColor: {
      type: String,
      optional: true
    }
  }
);

Products.attachSchema(ExtendedProductSchema, { replace: true, selector: { type: 'simple' }});
registerSchema('Product', ExtendedProductSchema);
