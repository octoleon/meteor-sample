import { Template } from 'meteor/templating';
import SupplyChainContainer from '../containers/SupplyChainContainer';

Template.supplyChain.helpers({
  SupplyChainContainer () {
    return SupplyChainContainer;
  }
})
