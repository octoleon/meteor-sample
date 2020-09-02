import { Reaction } from '/server/api';

Reaction.registerPackage({
  label: 'Flaneur Recommends',
  name: 'recommends',
  icon: "fa fa-thumbs-up",
  autoEnable: true,
  settings: {
    name: "Flaneur Recommends"
  },
  registry: [{
    route: "/dashboard/recommends",
    provides: ["dashboard"],
    workflow: "coreWorkflow",
    name: "manageRecommends",
    label: "Flaneur Recommends",
    description: "Manage recommends",
    icon: "fa fa-thumbs-up",
    priority: 6,
    container: "core",
    template: "manageRecommends"
  }, {
    route: '/recommends',
    template: 'recommends'
  }]
});
