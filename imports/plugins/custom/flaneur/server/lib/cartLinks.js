/**
 * @file
 * Functions for generating and applying a Cart Link
 */

import { Cart } from '/lib/collections';
import { CartLinks } from '../../lib/collections';

/**
 * Generates a cart link by inserting given user's cart items into CartLinks
 * collection and returning its _id
 *
 * @param {String} userId
 * @returns {String} _id of new CartLink
 */
export function generateCartLink (userId) {
  const cart = Cart.findOne({ userId });
  if (!cart) {
    throw new Meteor.Error(404, 'Cart not found');
  }

  const { items } = cart;
  if (!items || items.length === 0) {
    throw new Meteor.Error(400, 'Your cart has no items to share.');
  }

  return CartLinks.insert({
    userId,
    items
  });
}

/**
 * Applys given CartLink's items to the given user's cart
 *
 * @param {String} id _id of CartLink
 * @param {String} userId _id of user to have cart updated
 */
export function applyCartLink (id, userId) {
  const cartLink = CartLinks.findOne(id);
  if (!cartLink) {
    throw new Meteor.Error(404, 'Cart Link not found');
  }

  const { items } = cartLink;

  const cart = Cart.findOne({ userId });
  if (!cart) {
    throw new Meteor.Error(404, 'Cart not found');
  }

  Cart.update(cart._id, { $set: { items }});
}
