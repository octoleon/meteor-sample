/**
 * @file
 * Product-related helper functions
 */

import { Tags } from '/lib/collections';

/**
 * Determines whether the given product has been tagged with "Capsule".
 *
 * @param {Object} product
 *
 * @returns {Boolean}
 */
export function isProductCapsule (product) {
  let isCapsule = false;
  const capsuleTag = getTagBySlug('capsule');
  const productTagIds = product.hashtags || [];
  capsuleTag && productTagIds.forEach(tagId => {
    if (tagId === capsuleTag._id) {
      isCapsule = true;
    }
  });
  return isCapsule;
}

export function doesProductHaveOneOfTags(product, tagSlugs) {
  const productTagIds = product.hashtags || [];
  const tags = tagSlugs.map(slug => getTagBySlug(slug));
  let hasOneOfTags = false;
  tags.forEach(tag => {
    if (tag && productTagIds.includes(tag._id)) {
      hasOneOfTags = true
    }
  });
  return hasOneOfTags;
}

function getTagBySlug (slug) {
  const allTags = Tags.find().fetch();
  const tag = allTags.find(tag => tag.slug === slug);
  return tag;
}
