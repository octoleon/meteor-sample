/**
 * @file
 * SEO-related functions
 */

import { Reaction } from '/client/api';

/**
 * Sets document title and SEO meta description.
 *
 * @param {String} title
 * @param {String} desc Optional
 */
export function setMeta(title, desc = '') {
  document.title = `${title} | Flaneur`;
  if (desc) {
    Reaction.DOM.setMetaTag({
      name: 'description',
      content: desc
    });
  }
}
