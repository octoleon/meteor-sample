/**
 * @file
 * Functions for loading and retrieving assets (setting objects stored in db by name)
 */

import { Assets } from '/lib/collections'

/**
 * Loads an asset from the Assets collection, and returns an object with the
 * specified fields.
 *
 * @param {String} name - Name from Assets collection
 * @returns {Object || Undefined} content from Assets collection
 */
export function getAsset (name) {
  const asset = Assets.findOne({ name });
  if (asset) {
    const content = JSON.parse(asset.content);
    return content;
  }
}

/**
 * Updates an asset from the Assets collection
 *
 * @param {String} name
 * @param {Object} content
 */
export function updateAsset(name, content) {
  const existing = Assets.findOne({ name });
  const assetContentStr = JSON.stringify(content);

  if (existing) {
    Assets.update({ name }, {
      $set: {
        content: assetContentStr
      }
    });
  } else {
    Assets.insert({
      name,
      type: 'setting',
      content: assetContentStr
    });
  }
}
