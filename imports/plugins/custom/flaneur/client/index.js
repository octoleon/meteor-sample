// Initialize Bootstrap theme for Tabular tables
import { $ } from 'meteor/jquery';
import dataTablesBootstrap from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
dataTablesBootstrap(window, $);

import './less/tables.less';
import './less/manage-feature-line.less';
import './less/manage-homepage-banner.less';
import './less/manage-homepage-info.less';
import './less/manage-homepage-top-sellers.less';
import './less/share-cart-link.less';
import './less/cart-modal.less';
import './templates/manageFeatureLine.html';
import './templates/manageFeatureLine';
import './templates/manageHomepageBanner.html';
import './templates/manageHomepageBanner';
import './templates/manageHomepageInfo.html';
import './templates/manageHomepageInfo';
import './templates/manageHomepageTopSellers.html';
import './templates/manageHomepageTopSellers';
import './templates/intercom.html';
import './templates/applyCartLink.html';
import './templates/applyCartLink';
import './templates/FlaneurAccountProfile.html';
import './templates/FlaneurAccountProfile';
import './templates/home.html';
import './templates/home';
import '../lib/schemas/productsSchema';
import '../lib/schemas/ordersSchema';
import './components/FlaneurProductAdmin';
import './components/FlaneurCartDrawer';
import './components/FlaneurOrderSummary';
import './components/FlaneurOrderFilter';
import './components/FlaneurNavBar';
import './components/FlaneurCartIcon';
import './components/FlaneurShareButtons';
import './components/FlaneurVariantList';
import './components/FlaneurChildVariant';
import './components/PDPColorSetter';
import './components/PDPColorTitle';
import './components/PDPTitleInColor';
import './components/PDPInfoTabs';
import './components/PDPColorDescription';
import './components/PDPPageContent';
import './components/PDPPageContentTop';
import './components/FlaneurCompletedOrderItem';
import './components/FlaneurCartItems';
import './components/FlaneurLineItems';
import './components/FlaneurCoreLayout';
import './components/FlaneurCompletedOrder';
import './containers/ProductNavTabsContainer';
import './containers/FlaneurProductDetailContainer';
import './lib/webflow';

Meteor.startup(function () {
  Blaze.render(Template.intercom, $('body')[0]);

  // Intercept internal link clicks, using Reaction's Router
  $(document).ready(() => {
    Meteor.setTimeout(function () {
      $('a').on('click', e => {
      	const link = e.target;
      	const href = link.getAttribute('href');
      	if (href && href.startsWith('/')) {
      		e.preventDefault();
      		ReactionRouter.go(href);
        }
      });
    }, 2000);
  })
});
