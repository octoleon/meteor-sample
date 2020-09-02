import { Reaction } from '/server/api';

Reaction.registerPackage({
  label: 'Supply Chain',
  name: 'supply-chain',
  icon: "fa fa-sun-o",
  autoEnable: true,
  settings: {
    name: "Supply Chain"
  },
  registry: [
    {
      route: '/supply-chain',
      template: 'supplyChain'
    }
  ]
});
