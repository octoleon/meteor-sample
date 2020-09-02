import React, { Component } from 'react';
import SupplyChain from '../components/SupplyChain';
import { setMeta } from '/imports/plugins/custom/flaneur/client/lib/seo';

export default class SupplyChainContainer extends Component {

  state = {
    view: 'index', // or 'have', 'help', 'uploadImage', 'pickImageColor', 'enterPantone'
  };

  componentDidMount () {
    setMeta('Supply Chain');
    window.prerenderReady = true;
  }
  render () {
    const { view } = this.state;

    return (
      <SupplyChain
        view={view}
      />
    );
  }
}
