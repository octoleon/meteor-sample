import { BrowserPolicy } from "meteor/browser-policy-common";

import './methods/flaneurMethods';
import './methods/coreMethods';
import './init';
import '../lib/schemas/productsSchema';
import '../lib/schemas/ordersSchema';
import '../lib/schemas/cartItemSchema';
import "./hooks";

BrowserPolicy.content.allowOriginForAll("https://widget.intercom.io:*");
BrowserPolicy.content.allowOriginForAll("https://js.intercomcdn.com:*");
BrowserPolicy.content.allowOriginForAll("https://static.intercomassets.com:*");
BrowserPolicy.content.allowOriginForAll("https://aktively.us3.list-manage.com:*");
BrowserPolicy.content.allowOriginForAll("https://fr-assets.com:*");
BrowserPolicy.content.allowOriginForAll("https://chimpstatic.com:*");
BrowserPolicy.content.allowOriginForAll("https://uploads-ssl.webflow.com:*");
BrowserPolicy.content.allowOriginForAll("http://www.google-analytics.com:*");
BrowserPolicy.content.allowOriginForAll("https://www.google-analytics.com/analytics.js");
BrowserPolicy.content.allowOriginForAll("https://www.googletagmanager.com:*");
BrowserPolicy.content.allowOriginForAll("http://www.googletagmanager.com:*");
BrowserPolicy.content.allowOriginForAll("https://stats.g.doubleclick.net:*");
BrowserPolicy.content.allowOriginForAll("http://stats.g.doubleclick.net:*");
BrowserPolicy.content.allowOriginForAll("https://uploads-ssl.webflow.com:*");
BrowserPolicy.content.allowOriginForAll("https://www.google-analytics.com:*");
BrowserPolicy.content.allowOriginForAll("http://tagmanager.google.com:*");
BrowserPolicy.content.allowOriginForAll("http://cdn.heapanalytics.com:*");
BrowserPolicy.content.allowOriginForAll("https://cdn.heapanalytics.com:*");
BrowserPolicy.content.allowOriginForAll("https://heapanalytics.com:*");
BrowserPolicy.content.allowOriginForAll("http://heapanalytics.com:*");
BrowserPolicy.content.allowOriginForAll("http://www.heapanalytics.com:*");
BrowserPolicy.content.allowOriginForAll("https://www.heapanalytics.com:*");
BrowserPolicy.content.allowOriginForAll("http://static.hotjar.com:*");
BrowserPolicy.content.allowOriginForAll("https://static.hotjar.com:*");
BrowserPolicy.content.allowOriginForAll("https://script.hotjar.com:*");
BrowserPolicy.content.allowOriginForAll("http://script.hotjar.com:*");
BrowserPolicy.content.allowOriginForAll("https://vars.hotjar.com:*");
BrowserPolicy.content.allowOriginForAll("https://*.hotjar.com:*");

const absoluteUrl = Meteor.absoluteUrl().slice(0, -1);
if (absoluteUrl.includes('localhost') === false) {
  BrowserPolicy.content.allowOriginForAll(`${absoluteUrl}:*`);
}
