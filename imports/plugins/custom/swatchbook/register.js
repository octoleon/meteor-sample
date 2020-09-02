import { Reaction } from '/server/api';

Reaction.registerPackage({
  label: 'Swatchbook',
  name: 'swatchbook',
  icon: "fa fa-home",
  autoEnable: true,
  settings: {
    name: "Swatchbook"
  },
  registry: []
});
