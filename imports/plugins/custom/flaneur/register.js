import { Reaction } from '/server/api';

Reaction.registerPackage({
  label: 'Flaneur',
  name: 'flaneur',
  icon: "fa fa-comment",
  autoEnable: true,
  settings: {
    name: "Flaneur"
  },
  registry: [{
    route: "/dashboard/featureline",
    provides: ["dashboard"],
    workflow: "coreWorkflow",
    name: "manageFeatureLine",
    label: "Header Feature Line",
    description: "Manage header feature line",
    icon: "fa fa-comment",
    priority: 7,
    container: "core",
    template: "manageFeatureLine"
  }, {
    route: "/dashboard/homepagebanner",
    provides: ["dashboard"],
    workflow: "coreWorkflow",
    name: "manageHomepageBanner",
    label: "Homepage Banner",
    description: "Manage homepage banner",
    icon: "fa fa-bullhorn",
    priority: 8,
    container: "core",
    template: "manageHomepageBanner"
  }, {
    route: "/dashboard/homepageinfo",
    provides: ["dashboard"],
    workflow: "coreWorkflow",
    name: "manageHomepageInfo",
    label: "Homepage Info",
    description: "Manage homepage info",
    icon: "fa fa-info",
    priority: 9,
    container: "core",
    template: "manageHomepageInfo"
  }, {
    route: "/dashboard/homepagetopsellers",
    provides: ["dashboard"],
    workflow: "coreWorkflow",
    name: "manageHomepageTopSellers",
    label: "Homepage Top Sellers",
    description: "Manage homepage top sellers",
    icon: "fa fa-fire",
    priority: 10,
    container: "core",
    template: "manageHomepageTopSellers"
  }, {
    route: '/cart-link/:id',
    template: 'applyCartLink'
  }, {
    route: '/',
    template: 'home'
  }]
});
