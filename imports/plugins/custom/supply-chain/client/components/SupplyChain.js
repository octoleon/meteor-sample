import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IndexView from './IndexView';

export default class SupplyChain extends Component {

  static propTypes = {
    view: PropTypes.string.isRequired,
  };

  render () {
    const { view } = this.props;
    return (
      <div id="supply-chain">
        {view === 'index' && <IndexView/>}
      </div>
    )
  }
}
