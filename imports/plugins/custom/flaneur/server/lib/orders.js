/**
 * @file
 * Order-related functions
 */

import { Meteor } from 'meteor/meteor';
import { SSR } from "meteor/meteorhacks:ssr";
import { Reaction } from '/server/api';
import { Orders, Shops } from '/lib/collections';
import _ from "lodash";

/**
 * Marks an order as acknowledged (set order.workflow.status).
 *
 * @param {String} id of order
 */
export function acknowledgeOrder (id) {
  const status = 'Garment Dye & Wash'
  Orders.update(id, {
    $set: {
      'workflow.status': status
    },
    $push: {
      'workflow.workflow': status
    }
  });
}

/**
 * Marks an order as press & fold (set order.workflow.status).
 *
 * @param {String} id of order
 */
export function pressfoldOrder (id) {
  const status = 'Press & Fold'
  Orders.update(id, {
    $set: {
      'workflow.status': status
    },
    $push: {
      'workflow.workflow': status
    }
  });
}

/**
 * Marks an order as quality check (set order.workflow.status).
 *
 * @param {String} id of order
 */
export function qualitycheckOrder (id) {
  const status = 'Quality Check'
  Orders.update(id, {
    $set: {
      'workflow.status': status
    },
    $push: {
      'workflow.workflow': status
    }
  });
}

/**
 * Sends an email to customer that Flaneur has acknowledged their order.
 *
 * @param {Object} order
 */
export function sendOrderAcknowledgmentEmail (order) {
  const shop = Shops.findOne(order.shopId);

  const tpl = "flaneurOrders/acknowledged";
  const subject = "flaneurOrders/acknowledged/subject";

  SSR.compileTemplate(tpl, Reaction.Email.getTemplate(tpl));
  SSR.compileTemplate(subject, Reaction.Email.getSubject(tpl));

  const emailLogo = Reaction.Email.getShopLogo(shop);
  const emailData = {
    shop,
    order,
    contactEmail: shop.emails[0].address,
    shopName: shop.name,
    emailLogo,
    homepage: Meteor.absoluteUrl(),
    copyrightDate,
    legalName: _.get(shop, "addressBook[0].company"),
    physicalAddress: {
      address: `${_.get(shop, "addressBook[0].address1")} ${_.get(shop, "addressBook[0].address2")}`,
      city: _.get(shop, "addressBook[0].city"),
      region: _.get(shop, "addressBook[0].region"),
      postal: _.get(shop, "addressBook[0].postal")
  }
};

  Reaction.Email.send({
    to: order.email,
    from: `${shop.name} <${shop.emails[0].address}>`,
    subject: SSR.render(subject, emailData),
    html: SSR.render(tpl, emailData)
  });
}

/**
 * Sends an email to customer that Flaneur has pressed and folded their order.
 *
 * @param {Object} order
 */
export function sendOrderPressFoldEmail (order) {
  const shop = Shops.findOne(order.shopId);

  const tpl = "flaneurOrders/pressfold";
  const subject = "flaneurOrders/pressfold/subject";

  SSR.compileTemplate(tpl, Reaction.Email.getTemplate(tpl));
  SSR.compileTemplate(subject, Reaction.Email.getSubject(tpl));

  const emailLogo = Reaction.Email.getShopLogo(shop);
  const emailData = {
    shop,
    order,
    contactEmail: shop.emails[0].address,
    shopName: shop.name,
    emailLogo,
    homepage: Meteor.absoluteUrl(),
    legalName: _.get(shop, "addressBook[0].company"),
    physicalAddress: {
      address: `${_.get(shop, "addressBook[0].address1")} ${_.get(shop, "addressBook[0].address2")}`,
      city: _.get(shop, "addressBook[0].city"),
      region: _.get(shop, "addressBook[0].region"),
      postal: _.get(shop, "addressBook[0].postal")
  }
};


  Reaction.Email.send({
    to: order.email,
    from: `${shop.name} <${shop.emails[0].address}>`,
    subject: SSR.render(subject, emailData),
    html: SSR.render(tpl, emailData)
  });
}

/**
 * Sends an email to customer that Flaneur has quality checked their order.
 *
 * @param {Object} order
 */
export function sendQualityCheckEmail (order) {
  const shop = Shops.findOne(order.shopId);

  const tpl = "flaneurOrders/qualitycheck";
  const subject = "flaneurOrders/qualitycheck/subject";

  SSR.compileTemplate(tpl, Reaction.Email.getTemplate(tpl));
  SSR.compileTemplate(subject, Reaction.Email.getSubject(tpl));

  const emailLogo = Reaction.Email.getShopLogo(shop);
    const emailData = {
      shop,
      order,
      contactEmail: shop.emails[0].address,
      shopName: shop.name,
      emailLogo,
      homepage: Meteor.absoluteUrl(),
      legalName: _.get(shop, "addressBook[0].company"),
      physicalAddress: {
        address: `${_.get(shop, "addressBook[0].address1")} ${_.get(shop, "addressBook[0].address2")}`,
        city: _.get(shop, "addressBook[0].city"),
        region: _.get(shop, "addressBook[0].region"),
        postal: _.get(shop, "addressBook[0].postal")
    }
  };


  Reaction.Email.send({
    to: order.email,
    from: `${shop.name} <${shop.emails[0].address}>`,
    subject: SSR.render(subject, emailData),
    html: SSR.render(tpl, emailData)
  });
}

/**
  * Sends new order email to customer (resend).
 *
 * @param {Object} order
 */
export function sendNewOrderResendEmail (order) {
  const shop = Shops.findOne(order.shopId);

  const tpl = "orders/new";
  const subject = "orders/new/subject";

  SSR.compileTemplate(tpl, Reaction.Email.getTemplate(tpl));
  SSR.compileTemplate(subject, Reaction.Email.getSubject(tpl));

  const emailLogo = Reaction.Email.getShopLogo(shop);
  const emailData = {
    shop,
    order,
    contactEmail: shop.emails[0].address,
    shopName: shop.name,
    emailLogo,
    homepage: Meteor.absoluteUrl(),
    legalName: _.get(shop, "addressBook[0].company"),
    physicalAddress: {
      address: `${_.get(shop, "addressBook[0].address1")} ${_.get(shop, "addressBook[0].address2")}`,
      city: _.get(shop, "addressBook[0].city"),
      region: _.get(shop, "addressBook[0].region"),
      postal: _.get(shop, "addressBook[0].postal")
  }
};


  Reaction.Email.send({
    to: order.email,
    from: `${shop.name} <${shop.emails[0].address}>`,
    subject: SSR.render(subject, emailData),
    html: SSR.render(tpl, emailData)
  });
}

/**
 * Sends new order email to admin (resend).
 *
 * @param {Object} order
 */
export function sendNewOrderResendAdminEmail (order) {
  const shop = Shops.findOne(order.shopId);

  const tpl = "orders/new-admin";
  const subject = "orders/new-admin/subject";

  SSR.compileTemplate(tpl, Reaction.Email.getTemplate(tpl));
  SSR.compileTemplate(subject, Reaction.Email.getSubject(tpl));

  const emailLogo = Reaction.Email.getShopLogo(shop);
  const emailData = {
    shop,
    order,
    contactEmail: shop.emails[0].address,
    shopName: shop.name,
    emailLogo,
    homepage: Meteor.absoluteUrl(),
    legalName: _.get(shop, "addressBook[0].company"),
    physicalAddress: {
      address: `${_.get(shop, "addressBook[0].address1")} ${_.get(shop, "addressBook[0].address2")}`,
      city: _.get(shop, "addressBook[0].city"),
      region: _.get(shop, "addressBook[0].region"),
      postal: _.get(shop, "addressBook[0].postal")
  }
};


  Reaction.Email.send({
    to: `lux@hiflaneur.com`,
    from: `${shop.name} <${shop.emails[0].address}>`,
    subject: SSR.render(subject, emailData),
    html: SSR.render(tpl, emailData)
  });
}

/**
 * Toggles an order being in 'exception' status. If exception is being removed,
 * sets order back to last non-exception status.
 *
 * @param {Object} order
 * @param {String} order._id
 * @param {Array} order.workflow
 */
export function toggleOrderException ({ _id, workflow }) {
  const { status } = workflow;
  const exceptionStatus = 'exception';
  const isException = status === exceptionStatus;
  const lastWorkflowStatus = workflow.workflow[workflow.workflow.length - 1];

  // Determine last status that wasn't an exception
  let lastNonExceptionStatus = '';
  workflow.workflow.forEach(status =>  {
    if (status !== exceptionStatus) {
      lastNonExceptionStatus = status;
    }
  });

  const nextWorkflowStatus = isException && lastNonExceptionStatus || exceptionStatus;

  Orders.update(_id, {
    $set: {
      'workflow.status': nextWorkflowStatus
    },
    $push: {
      'workflow.workflow': nextWorkflowStatus
    }
  });
}

/**
 * Returns the given order's admin notes
 *
 * @param {Object} order
 * @param {Array} order.flaneurNotes
 */
export function getOrderNotes ({ flaneurNotes }) {
  return flaneurNotes || [];
}

/**
 * Adds a note to the admin-level order notes.
 *
 * @param {String} orderId
 * @param {String} userId
 * @param {STring} text
 */
export function addOrderNote (orderId, userId, text) {
  const user = Meteor.users.findOne(userId, { fields: { _id: 1, name: 1 }});
  const note = {
    text,
    userId: user._id,
    userName: user.name,
    createdAt: new Date()
  };

  Orders.update(orderId, {
    $push: {
      flaneurNotes: {
        $each: [note],
        $position: 0
      }
    }
  });

  return note;
}
