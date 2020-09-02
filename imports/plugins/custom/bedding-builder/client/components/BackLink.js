import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BackLink extends Component {

  static propTypes = {
    onBackClick: PropTypes.func.isRequired,
  }

  render () {
    const { onBackClick } = this.props;
    return (
      <p className="back-link">
        <a href="javascript:void(0)" onClick={onBackClick}>Back</a>
      </p>
    );
  }
}
