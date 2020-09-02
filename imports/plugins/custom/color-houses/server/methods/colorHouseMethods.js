import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Reaction } from '/server/api';
import { ColorHouses } from '../../lib/collections';
import { Colors } from '/imports/plugins/custom/colors/lib/collections';
import { getProductTabList } from '/imports/plugins/custom/flaneur/server/lib/products';

const validateColorHouse = function ({
  title,
  description,
  imageFileId,
  imageFileName,
  colorHouseTag,
  colorIds
}) {
  check(title, String);
  check(description, String);
  check(imageFileId, String);
  check(imageFileName, String);
  check(colorHouseTag, String);
  check(colorIds, Array);

  if (title === '') {
    throw new Meteor.Error(400, 'Title is required');
  }
  if (description === '') {
    throw new Meteor.Error(400, 'Description is required');
  }

  if (colorIds.length === 0) {
    throw new Meteor.Error(400, 'Color is required');
  }

  colorIds.forEach(colorId => {
    check(colorId, String);
  });
}

Meteor.methods({
  'ColorHouses.create' (fields) {
    check(fields, Object);
    const {
      title,
      description,
      imageFileId,
      imageFileName,
      colorHouseTag,
      colorIds
    } = fields;

    validateColorHouse({
      title,
      description,
      imageFileId,
      imageFileName,
      colorHouseTag,
      colorIds
    });

    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    if (Reaction.hasAdminAccess() === false) {
      throw new Meteor.Error(403, 'You do not have admin permissions');
    }

    const existingByTitle = ColorHouses.findOne({ title }, { fields: { _id: 1 }});
    if (existingByTitle) {
      throw new Meteor.Error(400, 'A color house with the title you specified already exists');
    }

    ColorHouses.insert({
      title,
      description,
      imageFileId,
      imageFileName,
      colorHouseTag,
      colorIds,
      createdAt: new Date()
    });
  },

  'ColorHouses.update' (fields) {
    check(fields, Object);
    const {
      _id,
      title,
      description,
      imageFileId,
      imageFileName,
      colorHouseTag,
      colorIds
    } = fields;

    validateColorHouse({
      title,
      description,
      imageFileId,
      imageFileName,
      colorHouseTag,
      colorIds
    });

    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    if (Reaction.hasAdminAccess() === false) {
      throw new Meteor.Error(403, 'You do not have admin permissions');
    }

    if (_id === '') {
      throw new Meteor.Error(400, 'No _id supplied');
    }

    const colorHouse = ColorHouses.findOne(_id);
    if (!colorHouse) {
      throw new Meteor.Error(404, 'Color house not found');
    }

    const existingByTitle = ColorHouses.findOne({
      title,
      _id: {
        $ne: _id
      }
    }, { fields: { _id: 1 }});
    if (existingByTitle) {
      throw new Meteor.Error(400, 'A color house with the title you specified already exists');
    }

    ColorHouses.update(_id, {
      title,
      description,
      imageFileId,
      imageFileName,
      colorHouseTag,
      colorIds,
      updatedAt: new Date()
    });
  },

  'ColorHouses.delete' (_id) {
    check(_id, String);

    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    if (Reaction.hasAdminAccess() === false) {
      throw new Meteor.Error(403, 'You do not have admin permissions.');
    }

    if (_id === '') {
      throw new Meteor.Error(400, 'No _id supplied');
    }

    ColorHouses.remove(_id);
  },

  'ColorHouses.getHouseColors' (_id) {
    check(_id, String);

    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    if (Reaction.hasAdminAccess() === false) {
      throw new Meteor.Error(403, 'You do not have admin permissions.');
    }

    if (_id === '') {
      throw new Meteor.Error(400, 'No _id supplied');
    }

    const colorHouse = ColorHouses.findOne(_id, { fields: { colorIds: 1 }});
    if (!colorHouse) {
      throw new Meteor.Error(404, 'Color house not found');
    }

    if (!colorHouse.colorIds || colorHouse.colorIds.length === 0) {
      return [];
    }

    const colors = Colors.find({
      _id: {
        $in: colorHouse.colorIds
      }
    }, {
      fields: {
        _id: 1,
        name: 1
      }
    }).fetch();

    // Return colors in same order as colorIds
    return colorHouse.colorIds.map(colorId => colors.find(color => color._id === colorId));
  },

  'ColorHouses.get' () {
    const colorHouses = ColorHouses.find({}, { sort: { createdAt: -1 }}).fetch();
    const colorsById = {};
    const firstProduct = getProductTabList(1)[0];
    const { handle } = firstProduct;
    const firstProductURL = `/product/${handle}`;

    // Build colorHouse.colors array with color metadata
    colorHouses.forEach(colorHouse => {
      const { colorIds } = colorHouse;
      colorHouse.colors = [];

      colorIds.forEach(colorId => {
        if (!colorsById[colorId]) {
          const color = Colors.findOne(colorId);
          color.pdpURL = `${firstProductURL}/${color.slug}`;
          colorsById[colorId] = color;
        }
        colorHouse.colors.push(colorsById[colorId]);
      });
    });

    return colorHouses;
  }
});
