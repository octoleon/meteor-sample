/**
 * Delete this package in Packages collection so that each time RC restarts
 * Reaction.registerPackage() will be called again
 */

import { Reaction, Hooks } from '/server/api';
import { Packages } from "/lib/collections";
import { Colors } from '../lib/collections';

const deleteThisPackage = function () {
  console.log('Refreshing colors package registry');

  const shopId = Reaction.getShopId();

  Packages.remove({
    name: 'colors',
    shopId
  });
};

Hooks.Events.add('onCoreInit', function () {
  deleteThisPackage();
  createIndexes();
});

const createIndexes = function () {
  console.log('Ensuring indexes for Colors collection');
  const rawColors = Colors.rawCollection();
  const options = { background: true };
  rawColors.createIndex({ pantoneCode: 1 }, options);
  rawColors.createIndex({ hexCode: 1 }, options);
  rawColors.createIndex({ slug: 1 }, options);
};
