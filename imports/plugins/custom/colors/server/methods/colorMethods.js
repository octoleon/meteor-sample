import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Reaction } from '/server/api';
import { Colors } from '../../lib/collections';
import { getProductTabList } from '/imports/plugins/custom/flaneur/server/lib/products';

const getPDPURL = function () {
  const firstProduct = getProductTabList(1)[0];
  const { handle } = firstProduct;
  const firstProductURL = `/product/${handle}`;
  return firstProductURL;
};

const validateColor = function ({
                                  name,
                                  description,
                                  pantoneCode,
                                  hexCode,
                                  colorTag,
                                  slug
                                }) {
  check(name, String);
  check(description, String);
  check(pantoneCode, String);
  check(hexCode, String);
  check(colorTag, String);
  check(slug, String);

  if (name === '') {
    throw new Meteor.Error(400, 'Name is required');
  }
  if (pantoneCode === '') {
    throw new Meteor.Error(400, 'Pantone Code is required');
  }
  if (hexCode === '') {
    throw new Meteor.Error(400, 'HEX Code is required');
  }
  if (slug === '') {
    throw new Meteor.Error(400, 'Slug is required');
  }
};

const getByPantoneCodes = (pantoneCodes) => {
  const pdpURL = getPDPURL();

  const colors = Colors.find({
    pantoneCode: {
      $in: pantoneCodes
    }
  }, {
    fields: {
      name: 1,
      pantoneCode: 1,
      hexCode: 1,
      colorTag: 1,
      slug: 1
    }
  }).fetch().map(color => {
    color.pdpURL = `${pdpURL}/${color.slug}`;
    return color;
  });

  const orderedColors = pantoneCodes.map(pantoneCode => {
    const color = colors.find(color => color.pantoneCode === pantoneCode);
    return color;
  });

  return _.uniq(orderedColors);
};

Meteor.methods({
  'Colors.create' (fields) {
    check(fields, Object);
    const {
      name,
      description,
      pantoneCode,
      hexCode,
      colorTag,
      slug
    } = fields;

    validateColor({ name, description, pantoneCode, colorTag, hexCode, slug });

    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    if (Reaction.hasAdminAccess() === false) {
      throw new Meteor.Error(403, 'You do not have admin permissions');
    }

    const existingByName = Colors.findOne({ name }, { fields: { _id: 1 }});
    if (existingByName) {
      throw new Meteor.Error(400, 'A color with the name you specified already exists');
    }
    const existingByPantone = Colors.findOne({ pantoneCode }, { fields: { _id: 1 }});
    if (existingByPantone) {
      throw new Meteor.Error(400, 'A color with the pantone code you specified already exists');
    }
    const existingByHex = Colors.findOne({ hexCode }, { fields: { _id: 1 }});
    if (existingByHex) {
      throw new Meteor.Error(400, 'A color with the HEX code you specified already exists');
    }
    const existingBySlug = Colors.findOne({ slug }, { fields: { _id: 1 }});
    if (existingBySlug) {
      throw new Meteor.Error(400, 'A color with the slug you specified already exists');
    }

    Colors.insert({
      name,
      description,
      pantoneCode,
      hexCode,
      slug,
      colorTag,
      createdAt: new Date()
    });
  },

  'Colors.update' (fields) {
    check(fields, Object);
    const {
      _id,
      name,
      colorTag,
      description,
      pantoneCode,
      hexCode,
      slug
    } = fields;

    validateColor({ name, description, pantoneCode, colorTag, hexCode, slug });

    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    if (Reaction.hasAdminAccess() === false) {
      throw new Meteor.Error(403, 'You do not have admin permissions');
    }

    if (_id === '') {
      throw new Meteor.Error(400, 'No _id supplied');
    }

    const color = Colors.findOne(_id);
    if (!color) {
      throw new Meteor.Error(404, 'Color not found');
    }

    const idSelector = {
      _id: {
        $ne: _id
      }
    };
    const existingByName = Colors.findOne({ name, ... idSelector}, { fields: { _id: 1 }});
    if (existingByName) {
      throw new Meteor.Error(400, 'A color with the name you specified already exists');
    }
    const existingByPantone = Colors.findOne({ pantoneCode, ... idSelector }, { fields: { _id: 1 }});
    if (existingByPantone) {
      throw new Meteor.Error(400, 'A color with the pantone code you specified already exists');
    }
    const existingByHex = Colors.findOne({ hexCode, ... idSelector }, { fields: { _id: 1 }});
    if (existingByHex) {
      throw new Meteor.Error(400, 'A color with the HEX code you specified already exists');
    }
    const existingBySlug = Colors.findOne({ slug, ... idSelector }, { fields: { _id: 1 }});
    if (existingBySlug) {
      throw new Meteor.Error(400, 'A color with the slug you specified already exists');
    }

    Colors.update(_id, {
      name,
      description,
      pantoneCode,
      hexCode,
      colorTag,
      slug,
      updatedAt: new Date()
    });
  },

  'Colors.delete' (_id) {
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

    Colors.remove(_id);
  },

  'Colors.autocompleteSearch' (query) {
    check(query, String);

    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    if (Reaction.hasAdminAccess() === false) {
      throw new Meteor.Error(403, 'You do not have admin permissions.');
    }

    return Colors.find({
      name: {
        $regex: `.*${query}*.`,
        $options: 'i'
      }
    }, {
      sort: {
        name: 1
      },
      fields: {
        _id: 1,
        name: 1
      }
    }).fetch();
  },

  'Colors.getBySlug' (slug) {
    check(slug, String);
    const color = Colors.findOne({ slug }, { fields: { hexCode: 1 }});
    return color || {};
  },

  'Colors.getDescription' (_id) {
    check(_id, String);
    const color = Colors.findOne(_id);
    return color && color.description || '';
  },

  'Colors.getNameBySlug' (slug) {
    check(slug, String);
    const color = Colors.findOne({ slug }, { fields: { name: 1 }});
    return color && color.name || '';
  },

  'Colors.getByPantoneCodesList' (pantoneCodesList) {
    check(pantoneCodesList, [[String]]);
    return pantoneCodesList.map((pantoneCodes) => getByPantoneCodes(pantoneCodes));
  },

  'Colors.getByPantoneCodes' (pantoneCodes) {
    check(pantoneCodes, [String]);
    return getByPantoneCodes(pantoneCodes);
  },

  'Colors.getByIds' (ids) {
    check(ids, [String]);
    const pdpURL = getPDPURL();

    const colors = Colors.find({
      _id: {
        $in: ids
      }
    }, {
      fields: {
        name: 1,
        pantoneCode: 1,
        hexCode: 1,
        colorTag: 1,
        slug: 1
      }
    }).fetch().map(color => {
      color.pdpURL = `${pdpURL}/${color.slug}`;
      return color;
    });

    const orderedColors = ids.map(_id => {
      const color = colors.find(color => color._id === _id);
      return color;
    });

    return _.uniq(orderedColors);
  }
});
