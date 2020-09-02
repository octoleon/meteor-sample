import { Reaction } from '/server/api';

Reaction.registerPackage({
  label: 'Flaneur Theme',
  name: 'flaneur-theme',
  icon: "fa fa-sun-o",
  autoEnable: true,
  settings: {
    name: "Flaneur Theme"
  },
  registry: []
});
