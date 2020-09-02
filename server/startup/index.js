import SimpleSchema from "simpl-schema";
import { Meteor } from "meteor/meteor";
import { robots } from 'meteor/gadicohen:robots-txt';
import Accounts from "./accounts";
import "./browser-policy";
import CollectionSecurity from "./collection-security";
import { importAllTranslations } from "./i18n";
import LoadFixtureData from "./load-data";
import Prerender from "./prerender";
import RateLimiters from "./rate-limits";
import RegisterCore from "./register-core";
import RegisterRouter from "./register-router";
import { initTemplates } from "/server/api/core/templates";
import { Reaction, Logger } from "/server/api";
import { Shops } from "/lib/collections";

// This is needed so that it throws a Meteor.Error as `check()` would do
// when we call schema.validate() in a Meteor method.
// https://github.com/aldeed/node-simple-schema/#customize-the-error-that-is-thrown
SimpleSchema.defineValidationErrorTransform((error) => {
  const ddpError = new Meteor.Error(error.message);
  ddpError.error = "validation-error";
  ddpError.details = error.details;
  return ddpError;
});

export default function startup() {
  const startTime = Date.now();

  Accounts();
  initTemplates();
  RegisterCore();
  RegisterRouter();

  // initialize shop registry when a new shop is added
  Shops.find().observe({
    added(doc) {
      Reaction.setShopName(doc);
      Reaction.setDomain();
    },
    removed() {
      // TODO SHOP REMOVAL CLEANUP FOR #357
    }
  });

  LoadFixtureData();
  Reaction.init();

  importAllTranslations();

  Prerender();
  CollectionSecurity();
  RateLimiters();
  if (Meteor.settings.disableSEO) {
    robots.addLine('Disallow: /');
  }
  robots.addLine('User-agent: *');
  robots.addLine('Disallow: /product/salon.hiflaneur.com');
  robots.addLine('Disallow: /product/boudoir/salon.hiflaneur.com');
  robots.addLine('Disallow: /product/duvet-covers/salon.hiflaneur.com');
  robots.addLine('Disallow: /product/pillowcases/tubigen');
  robots.addLine('Disallow: /product/sham/tubigen');
  robots.addLine('Disallow: /product/shop-the-look');
  const endTime = Date.now();
  Logger.info(`Reaction initialization finished: ${endTime - startTime}ms`);
}
