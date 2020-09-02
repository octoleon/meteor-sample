/**
 * Delete this package in Packages collection so that each time RC restarts
 * Reaction.registerPackage() will be called again
 */

import { Reaction, Hooks } from '/server/api';
import { Packages } from "/lib/collections";

const deleteThisPackage = function () {
  console.log('Refreshing color-houses package registry');

  const shopId = Reaction.getShopId();

  Packages.remove({
    name: 'color-houses',
    shopId
  });
};

Hooks.Events.add('onCoreInit', function () {
  deleteThisPackage();
});
