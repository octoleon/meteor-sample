import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ColorLink from '/imports/plugins/custom/colors/client/components/ColorLink';

export default class Recommends extends Component {

  static propTypes = {
    recommends: PropTypes.array,
    swatchbookColorIds: PropTypes.array.isRequired,
    onSwatchbookAddClick: PropTypes.func.isRequired,
    onSwatchbookRemoveClick: PropTypes.func.isRequired
  };

  render () {
    const {
      recommends,
      onColorClick,
      swatchbookColorIds,
      onSwatchbookRemoveClick,
      onSwatchbookAddClick
    } = this.props;
    return (
      <div className="recommend-container-box w-container">        
        {recommends.length && recommends.map(recommend => {
          const {
            createdAt,
            colors
          } = recommend;

          return (
            <div className="color-box w-inline-block" style={{textAlign: 'center'}}>
              {colors.map(color => {
                const { _id, name, hexCode, slug, pantoneCode, pdpURL } = color;
                return (                        
                  <ColorLink
                    key={_id}
                    _id={_id}
                    name={name}
                    hexCode={hexCode}
                    slug={slug}
                    pantoneCode={pantoneCode}
                    pdpURL={pdpURL}
                    isInSwatchbook={swatchbookColorIds.includes(_id)}
                    onSwatchbookRemoveClick={onSwatchbookRemoveClick}
                    onSwatchbookAddClick={onSwatchbookAddClick}
                  />
                  );
                })}
              <h5>Date: {moment(createdAt).format('MM/DD/YY')}</h5>  
            </div>
          );
        }) || null}
      </div>
    );
  }
}
