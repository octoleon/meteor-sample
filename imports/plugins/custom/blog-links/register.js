import { Reaction } from '/server/api';

Reaction.registerPackage({
  label: 'Blog Links',
  name: 'blog-links',
  icon: "fa fa-link",
  autoEnable: true,
  settings: {
    name: "Blog Links"
  },
  registry: [{
    route: "/dashboard/blog-links",
    provides: ["dashboard"],
    workflow: "coreWorkflow",
    name: "blogLinks",
    label: "Blog Links",
    description: "Manage blog links",
    icon: "fa fa-link",
    priority: 3,
    container: "core",
    template: "blogLinks"
  }]
});
