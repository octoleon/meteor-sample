import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Reaction } from '/server/api';
import { Recommends } from '../../lib/collections';
import { Colors } from '/imports/plugins/custom/colors/lib/collections';
import { getProductTabList } from '/imports/plugins/custom/flaneur/server/lib/products';

const validateRecommend = function ({
  colorName,
  description,
  colorIds
}) {
  check(colorName, String);
  check(description, String);  
  check(colorIds, Array);
  
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
  'Recommends.create' (fields) {
    check(fields, Object);
    const {
      colorName,
      description,
      colorIds      
    } = fields;

    validateRecommend({
      colorName,
      description,
      colorIds      
    });

    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    if (Reaction.hasAdminAccess() === false) {
      throw new Meteor.Error(403, 'You do not have admin permissions');
    }

    Recommends.insert({
      colorName,
      description,
      colorIds,      
      createdAt: new Date()
    });
  },

  'Recommends.update' (fields) {
    check(fields, Object);
    const {
      _id,
      colorName,
      description,
      colorIds      
    } = fields;

    validateRecommend({
      colorName,
      description,
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

    const recommend = Recommends.findOne(_id);
    if (!recommend) {
      throw new Meteor.Error(404, 'Recommend not found');
    }

    Recommends.update(_id, {
      colorName,
      description,
      colorIds,      
      updatedAt: new Date()
    });
  },

  'Recommends.delete' (_id) {
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

    Recommends.remove(_id);
  },

  'Recommends.getRecommendColors' (_id) {
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

    const recommend = Recommends.findOne(_id, { fields: { colorIds: 1 }});
    if (!recommend) {
      throw new Meteor.Error(404, 'Recommend not found');
    }

    if (!recommend.colorIds || recommend.colorIds.length ===0) {
      return [];
    }

    const colors = Colors.find({
      _id: {
        $in: recommend.colorIds
      }
    }, {
      fields: {
        _id: 1,
        name: 1
      }
    }).fetch();

    // Return colors in same order as colorIds
    return recommend.colorIds.map(colorId => colors.find(color => color._id === colorId));
  },

  'Recommends.get' () {
    const recommends = Recommends.find({}, { fileds: { colorName: -1, description: -1 }}).fetch();
    const colorsById = {};
    const firstProduct = getProductTabList(1)[0];
    const { handle } = firstProduct;
    const firstProductURL = `/product/${handle}`;

    // Build colorHouse.colors array with color metadata
    recommends.forEach(recommend => {
      const { colorIds } = recommend;
      recommend.colors = [];

      colorIds.forEach(colorId => {
        if (!colorsById[colorId]) {
          const color = Colors.findOne(colorId);
          color.pdpURL = `${firstProductURL}/${color.slug}`;
          colorsById[colorId] = color;
        }
        recommend.colors.push(colorsById[colorId]);
      });     
    });

    return recommends;
  }
});
