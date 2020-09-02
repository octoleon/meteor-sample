import { Meteor } from 'meteor/meteor';
import { Colors } from '/imports/plugins/custom/colors/lib/collections';

/**
 * Validates and returns current user.
 * @param {MethodInstance} methodInstance this from within method
 * @returns {Object} user
 */
const validateUser = function (methodInstance) {
  if (!methodInstance.userId) {
    throw new Meteor.Error(401, 'Unauthorized');
  }

  const user = Meteor.users.findOne(methodInstance.userId);
  if (!user) {
    throw new Meteor.Error(404, 'User not found');
  }

  return user;
};

/**
 * Validates a color _id and returns the color.
 *
 * @param {String} id
 *
 * @returns {Object} color
 */
const validateColor = function (id) {
  const color = Colors.findOne(id);
  if (!color) {
    throw new Meteor.Error(404, 'Color not found');
  }

  return color;
};

Meteor.methods({
  'swatchbook.addColor' (colorId) {
    check(colorId, String);
    const user = validateUser(this);
    const color = validateColor(colorId);
    let { swatchbookColorIds } = user.profile;
    if (!swatchbookColorIds) {
      swatchbookColorIds = [];
    }

    if (swatchbookColorIds.includes(colorId)) {
      throw new Meteor.Error(400, 'This color already exists in your swatchbook.');
    }

    swatchbookColorIds.push(colorId);

    Meteor.users.update(this.userId, {
      $set: {
        'profile.swatchbookColorIds': swatchbookColorIds
      }
    });

    return color.name;
  },

  'swatchbook.removeColor' (colorId) {
    check(colorId, String);
    const user = validateUser(this);
    const color = validateColor(colorId);
    let { swatchbookColorIds } = user.profile;
    if (!swatchbookColorIds) {
      swatchbookColorIds = [];
    }
    const colorIndex = swatchbookColorIds.indexOf(colorId);

    if (colorIndex === -1) {
      throw new Meteor.Error(400, 'Color not in swatchbook');
    }

    swatchbookColorIds.splice(colorIndex, 1);

    Meteor.users.update(this.userId, {
      $set: {
        'profile.swatchbookColorIds': swatchbookColorIds
      }
    });

    return color.name;
  }
});
