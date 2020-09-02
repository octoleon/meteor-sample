import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ColorHousesOption extends Component {

  static propTypes = {
    onColorHousesClick: PropTypes.func.isRequired,
  }

  render () {
    const { onColorHousesClick } = this.props;
    return (
      <div className="option color-houses" onClick={onColorHousesClick}>
        <h3>See Color Houses</h3>
      </div>
    );
  }
}
