import { Reaction } from '/server/api';

Reaction.registerPackage({
  label: 'Color Houses',
  name: 'color-houses',
  icon: "fa fa-home",
  autoEnable: true,
  settings: {
    name: "Color Houses"
  },
  registry: [{
    route: "/dashboard/color-houses",
    provides: ["dashboard"],
    workflow: "coreWorkflow",
    name: "manageColorHouses",
    label: "Color Houses",
    description: "Manage color houses",
    icon: "fa fa-home",
    priority: 5,
    container: "core",
    template: "manageColorHouses"
  }, {
    route: '/color-houses',
    template: 'colorHouses'
  },
  {
    route: '/indulgence',
    template: 'indulgence'
  }]
});
