/**
 * Delete this package in Packages collection so that each time RC restarts
 * Reaction.registerPackage() will be called again
 */

import { Reaction, Hooks } from '/server/api';
import { Packages } from "/lib/collections";

const deleteThisPackage = function () {
  console.log('Refreshing blogLinks package registry');

  const shopId = Reaction.getShopId();

  Packages.remove({
    name: 'blog-links',
    shopId
  });
};

Hooks.Events.add('onCoreInit', function () {
  deleteThisPackage();
});
