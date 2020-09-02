import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ColorLink extends Component {

  static propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    hexCode: PropTypes.string.isRequired,
    colorTag: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    pantoneCode: PropTypes.string.isRequired,
    pdpURL: PropTypes.string.isRequired,
    isInSwatchbook: PropTypes.bool,
    onSwatchbookRemoveClick: PropTypes.func,
    onSwatchbookAddClick: PropTypes.func
  };

  handleColorClick = (e, pdpURL) => {
    e.preventDefault();
    ReactionRouter.go(pdpURL);
    window.scrollTo(0,0);
  };

  render () {
    const {
      _id,
      name,
      hexCode,
      slug,
      pantoneCode,
      pdpURL,
      colorTag,
      isInSwatchbook,
      onSwatchbookRemoveClick,
      onSwatchbookAddClick
    } = this.props;

    return (
      <div className="color-div">
      <a
        key={_id}
        className="color"
        href={pdpURL}
        onClick={(e) => this.handleColorClick(e, pdpURL)}>
        {isInSwatchbook && (
          <button
            className="rui btn btn-default flat button swatchbook-remove-button"
            onClick={e => onSwatchbookRemoveClick(e, _id)}>
            <div className="heart-full"><span></span></div>
          </button>
        )}
        {!isInSwatchbook && (
          <button
            className="rui btn btn-default flat button swatchbook-add-button"
            onClick={e => onSwatchbookAddClick(e, _id)}>
          <div className="heart-empty"><span></span></div>
          </button>
        )}
        <div className="color-sample"  id={colorTag} style={{backgroundColor: `#${hexCode}`}}>
          <img className="color-sample-sample" src="https://fr-assets.com/images/textureoverlay.png"/> {pantoneCode}
        </div>
        <span className="color-name">{name}</span>
      </a>
      </div>
    )
  }
}
