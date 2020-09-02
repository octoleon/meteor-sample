import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Server } from '/server/api';
import { FileRecord } from "@reactioncommerce/file-collections";
import { Media } from "/imports/plugins/core/files/server";
import { Assets, Products, Orders } from '/lib/collections';
import { Reaction } from '/server/api';
import { getAsset, updateAsset } from '../lib/assets';
import { Colors } from '../../../colors/lib/collections';
import { generateCartLink, applyCartLink } from '../lib/cartLinks';
import { getProductTabList } from '../lib/products';
import {
  acknowledgeOrder,
  pressfoldOrder,
  qualitycheckOrder,
  sendOrderAcknowledgmentEmail,
  sendOrderPressFoldEmail,
  sendQualityCheckEmail,
  sendNewOrderResendEmail,
  sendNewOrderResendAdminEmail,
  toggleOrderException,
  getOrderNotes,
  addOrderNote
} from '../lib/orders';

const validateOrder = id => {
  check(id, String);
  if (Reaction.hasAdminAccess() === false) {
    throw new Meteor.Error(403, 'You do not have admin permissions.');
  }

  const order = Orders.findOne(id);
  if (!order) {
    throw new Meteor.Error(404, 'Order not found');
  }

  return order;
};

Meteor.methods({
  'Flaneur.uploadFile' (fileInfo, fileData) {
    check(fileInfo, Object);
    check(fileData, String);
    const fileRecord = new FileRecord({
      original: {
        name: fileInfo.name,
        size: fileInfo.size,
        type: fileInfo.type,
        updatedAt: new Date()
      }
    });
    fileRecord.attachData(new Buffer(fileData, 'binary'));

    return Media.insert(fileRecord);
  },

  'Flaneur.getFeatureLine' () {
    const asset = getAsset('headerFeatureLine');
    if (!asset) {
      return {
        content: '',
        isEnabled: false
      };
    }

    return asset;
  },

  'Flaneur.updateFeatureLine' (data) {
    check(data, Object);
    const {
      content,
      isEnabled
    } = data;
    check(content, String);
    check(isEnabled, Boolean);

    const assetContent = { content, isEnabled };

    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    if (Reaction.hasAdminAccess() === false) {
      throw new Meteor.Error(403, 'You do not have admin permissions');
    }

    updateAsset('headerFeatureLine', assetContent);
  },

  'Flaneur.getHomepageBanner' () {
    const asset = getAsset('homepageBanner');
    if (!asset) {
      return {
        imageFileId: '',
        imageFileName: '',
        title: '',
        buttonText: '',
        linkUrl: ''
      };
    }

    return asset;
  },

  'Flaneur.updateHomepageBanner' (data) {
    check(data, Object);
    const {
      imageFileId,
      imageFileName,
      title,
      buttonText,
      linkUrl
    } = data;
    check(imageFileId, String);
    check(imageFileName, String);
    check(title, String);
    check(buttonText, String);
    check(linkUrl, String);

    const assetContent = {
      imageFileId,
      imageFileName,
      title,
      buttonText,
      linkUrl
    };

    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    if (Reaction.hasAdminAccess() === false) {
      throw new Meteor.Error(403, 'You do not have admin permissions');
    }

    updateAsset('homepageBanner', assetContent);
  },

  'Flaneur.getHomepageInfo' () {
    const asset = getAsset('homepageInfo');
    if (!asset) {
      return {
        imageFileId: '',
        imageFileName: '',
        title: '',
        description: '',
        buttonText: '',
        linkUrl: ''
      };
    }

    return asset;
  },

  'Flaneur.updateHomepageInfo' (data) {
    check(data, Object);
    const {
      imageFileId,
      imageFileName,
      title,
      description,
      buttonText,
      linkUrl
    } = data;
    check(imageFileId, String);
    check(imageFileName, String);
    check(title, String);
    check(description, String);
    check(buttonText, String);
    check(linkUrl, String);

    const assetContent = {
      imageFileId,
      imageFileName,
      title,
      description,
      buttonText,
      linkUrl
    };

    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    if (Reaction.hasAdminAccess() === false) {
      throw new Meteor.Error(403, 'You do not have admin permissions');
    }

    updateAsset('homepageInfo', assetContent);
  },

  'Flaneur.getHomepageTopSellers' () {
    const asset = getAsset('homepageTopSellers');
    if (!asset) {
      return {
        title: '',
        products: []
      };
    }

    // Include product title and color name in products
    asset.products = asset.products.map(product => {
      const { id, colorId } = product;
      const productInfo = Products.findOne(id, { fields: { title: 1 }});
      const title = productInfo.title || '';
      const color = Colors.findOne(colorId, { fields: { name: 1}});
      const colorName = color.name || '';
      return {
        id,
        title,
        colorId,
        colorName
      };
    });

    return asset;
  },

  'Flaneur.getColorSlug' (colorId) {
    check(colorId, String);

    const color = Colors.findOne(colorId, { fields: { slug: 1}});
    const slug = color.slug || '';

    return slug;
  },

  'Flaneur.updateHomepageTopSellers' (data) {
    check(data, Object);
    const {
      title,
    } = data;
    check(title, String);
    check(data.products, Array);

    const products = data.products.map(product => {
      const { id, title, colorId, colorName } = product;
      check(id, String);
      check(title, String);
      check(colorId, String);
      check(colorName, String);
      return { id, colorId };
    });

    const assetContent = {
      title,
      products
    };

    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    if (Reaction.hasAdminAccess() === false) {
      throw new Meteor.Error(403, 'You do not have admin permissions');
    }

    updateAsset('homepageTopSellers', assetContent);
  },

  'Flaneur.productAutocompleteSearch' (query) {
    check(query, String);

    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    if (Reaction.hasAdminAccess() === false) {
      throw new Meteor.Error(403, 'You do not have admin permissions.');
    }

    return Products.find({
      type: 'simple',
      title: {
        $regex: `.*${query}*.`,
        $options: 'i'
      }
    }, {
      sort: {
        title: 1
      },
      fields: {
        _id: 1,
        title: 1
      }
    }).fetch();
  },

  'Flaneur.generateCartLink' () {
    return generateCartLink(this.userId);
  },

  'Flaneur.applyCartLink' (id) {
    check(id, String);
    return applyCartLink(id, this.userId);
  },

  'FlaneurOrders.acknowledge' (id) {
    const order = validateOrder(id);

    // Set order to acknowledged status if it wasn't previously acknowledged
    const acknowledgedStatus = 'Garment Dye & Wash';
    const isOrWasAcknowledged = order.workflow.status === acknowledgedStatus ||
      order.workflow.workflow.includes(acknowledgedStatus);
    if (isOrWasAcknowledged === false) {
      acknowledgeOrder(id);
    }

    Meteor.defer(() => {
      sendOrderAcknowledgmentEmail(order);
    });
  },

  'FlaneurOrders.pressfold' (id) {
    const order = validateOrder(id);

    // Set order to press & fold status if it wasn't previously completed
    const pressfoldStatus = 'Press & Fold';
    const isOrWasPressFold = order.workflow.status === pressfoldStatus ||
      order.workflow.workflow.includes(pressfoldStatus);
    if (isOrWasPressFold === false) {
      pressfoldOrder(id);
    }

    Meteor.defer(() => {
      sendOrderPressFoldEmail(order);
    });
  },

  'FlaneurOrders.qualitycheck' (id) {
    const order = validateOrder(id);

    // Set order to quality check status if it wasn't previously completed
    const qualitycheckStatus = 'Quality Check';
    const isOrWasQualityCheck = order.workflow.status === qualitycheckStatus ||
      order.workflow.workflow.includes(qualitycheckStatus);
    if (isOrWasQualityCheck === false) {
      qualitycheckOrder(id);
    }

    Meteor.defer(() => {
      sendQualityCheckEmail(order);
    });
  },

  'FlaneurOrders.newresend' (id) {
    const order = validateOrder(id);

    // Set order to quality check status if it wasn't previously completed

    Meteor.defer(() => {
      sendNewOrderResendEmail(order);
    });
  },

  'FlaneurOrders.newresendAdmin' (id) {
    const order = validateOrder(id);

    // Set order to quality check status if it wasn't previously completed

    Meteor.defer(() => {
      sendNewOrderResendAdminEmail(order);
    });
  },

  'FlaneurOrders.toggleException' (id) {
    const order = validateOrder(id);
    toggleOrderException(order);
  },

  'FlaneurOrders.getNotes' (id) {
    const order = validateOrder(id);
    return getOrderNotes(order);
  },

  'FlaneurOrders.addNote' (id, text) {
    const order = validateOrder(id);
    check(text, String);
    return addOrderNote(order._id, this.userId, text);
  },

  'FlaneurProducts.getTabList' () {
    return getProductTabList();
  }
});
