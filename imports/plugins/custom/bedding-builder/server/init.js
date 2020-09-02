/**
 * Delete this package in Packages collection so that each time RC restarts
 * Reaction.registerPackage() will be called again
 */

import { Reaction, Hooks } from '/server/api';
import { Packages } from "/lib/collections";

const deleteThisPackage = function () {
  console.log('Refreshing flaneur package registry');

  const shopId = Reaction.getShopId();

  Packages.remove({
    name: 'bedding-builder',
    shopId
  });
};

Hooks.Events.add('onCoreInit', function () {
  deleteThisPackage();
});

/*
  * Pages - Visiting Design Your Bedding
  * When: User visits Design Your Bedding Page
  */
 Reaction.registerTemplate({
  title: 'Pages - Visit Design Your Bedding',
  name: 'visitpages/designYourBedding',
  type: "email",
  template: Assets.getText('custom/email/visitpages/designYourBedding.html'),
  // template: `<div>Visting Design Your Bedding Page Email Template!</div>`,
	subject: "Getting the bedding of your dreams"
});
