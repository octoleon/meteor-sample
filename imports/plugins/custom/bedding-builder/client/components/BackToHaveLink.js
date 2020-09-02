import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BackToHaveLink extends Component {

  static propTypes = {
    onBackToHaveClick: PropTypes.func.isRequired,
  }

  render () {
    const { onBackToHaveClick } = this.props;
    return (
      <p className="back-link">
        <a href="javascript:void(0)" onClick={onBackToHaveClick}>Back</a>
      </p>
    );
  }
}
