import { Meteor } from 'meteor/meteor';
import { Reaction } from '/server/api';
import { getAsset, updateAsset } from '/imports/plugins/custom/flaneur/server/lib/assets';

Meteor.methods({

  'MainMenu.get' () {
    const asset = getAsset('mainMenu');
    if (!asset) {
      return [];
    }
    return asset;
  },

  'MainMenu.update' (mainMenu) {
    check(mainMenu, Array);

    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    if (Reaction.hasAdminAccess() === false) {
      throw new Meteor.Error(403, 'You do not have admin permissions.');
    }

    updateAsset('mainMenu', mainMenu);
  }
});
