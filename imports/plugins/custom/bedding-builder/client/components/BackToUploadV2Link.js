import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BackToUploadV2Link extends Component {

  static propTypes = {
    onBackToUploadV2Click: PropTypes.func.isRequired,
  }

  render () {
    const { onBackToUploadV2Click } = this.props;
    return (
      <p className="back-link">
        <a href="javascript:void(0)" onClick={onBackToUploadV2Click}>Back</a>
      </p>
    );
  }
}
