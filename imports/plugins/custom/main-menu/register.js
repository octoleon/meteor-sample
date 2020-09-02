import { Reaction } from '/server/api';

Reaction.registerPackage({
  label: 'Main Menu',
  name: 'main-menu',
  icon: "fa fa-bars",
  autoEnable: true,
  settings: {
    name: "Main Menu"
  },
  registry: [{
    route: "/dashboard/main-menu",
    provides: ["dashboard"],
    workflow: "coreWorkflow",
    name: "manageMainMenu",
    label: "Main Menu",
    description: "Manage main menu",
    icon: "fa fa-bars",
    priority: 2,
    container: "core",
    template: "manageMainMenu"
  }]
});
