/**
 * @file
 * Various utility/helper functions
 */

import { Meteor } from 'meteor/meteor';

/**
 * Moves an item at a given index, to a new position in the given array,
 * and returns the array.
 *
 * @param {Array} arry
 * @param {Number} previousIndex Index item currently resides at
 * @param {Number} newIndex Index to move item to
 *
 * @returns {Array}
 */
export function arrayMove (arr, previousIndex, newIndex) {
  const array = arr.slice(0);
  if (newIndex >= array.length) {
    let k = newIndex - array.length;
    while (k-- + 1) {
      array.push(undefined);
    }
  }
  array.splice(newIndex, 0, array.splice(previousIndex, 1)[0]);
  return array;
}

/**
 * Slugify's the given string (that is, makes it URL compatible by removing spaces, etc)
 *
 * @param {String} text
 *
 * @returns {String}
 */
export function slugify (text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

/**
 * Returns the color slug from the URL, on the PDP page, if present.
 *
 * @param {String} handle Current product's handle
 *
 * @returns {String}
 */
export function getPDPColorSlug (handle) {
  const path = window.location.pathname;
  const pathParts = path.split('/');
  const lastPathArg = pathParts[pathParts.length - 1];
  return lastPathArg !== handle && lastPathArg || '';
}

/**
 * Returns the URL for a given image file
 *
 * @param {String} fileId
 * @param {String} fileName
 *
 * @returns {String} URL
 */
export function getImageURL (fileId, fileName) {
  return Meteor.absoluteUrl() + `assets/files/Media/${fileId}/image/${fileName}`;
}
