import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BackToUploadLink extends Component {

  static propTypes = {
    onBackToUploadClick: PropTypes.func.isRequired,
  }

  render () {
    const { onBackToUploadClick } = this.props;
    return (
      <p className="back-link">
        <a href="javascript:void(0)" onClick={onBackToUploadClick}>Back</a>
      </p>
    );
  }
}
