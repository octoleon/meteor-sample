import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import ColorLink from '/imports/plugins/custom/colors/client/components/ColorLink';
import handleSwatchbookRemoveClick from '/imports/plugins/custom/swatchbook/client/lib/handleSwatchbookRemoveClick';

class SwatchbookContainer extends Component {
  static propTypes = {
    colorIds: PropTypes.array.isRequired
  };

  state = {
    colors: []
  };

  componentDidMount () {
    this.getColors(this.props.colorIds);
  }

  componentDidUpdate (prevProps) {
    const currentColors = this.props.colorIds.toString();
    const prevColors = prevProps.colorIds.toString();
    if (currentColors !== prevColors) {
      this.getColors(this.props.colorIds);
    }
  }

  getColors = colorIds => {
    Meteor.call('Colors.getByIds', colorIds, (err, colors) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ colors });
      }
    });
  };

  handleAddClick = e => {
    e.preventDefault();
    ReactionRouter.go('/design-your-bedding');
  };

  handleSwatchViewClick = e => {
    e.preventDefault();
    const { isOpen } = this.state;
    const swatchbookDrawer = $('.swatchbook-drawer-container');

    if (isOpen) {
      swatchbookDrawer.hide();
    } else {
      swatchbookDrawer.show();
    }

    this.setState({ isOpen: !isOpen });
  };


  render () {
    const { colors } = this.state;
    return (

      <div className="swatchbook-drawer-container" ref={ref => this.container = ref}>
      <button
        className="rui btn btn-default flat button swatchbook-link-closer"
        onClick={this.handleSwatchViewClick}>Close</button>
          <div className="cart-drawer-swiper-slide swatch">

          {!colors.length && (
            <div className="no-colors-message">There are no colors in your swatchbook. Add items by tapping on the heart next to colors.
            <ul className="help-row-swatch">
            <li className="help-swatchbook-book"><img src="https://fr-assets.com/images/180216_Sophie_0964-p-800.jpeg"/><a className="help-swatchbook" href="/capsule">Shop Color Capsules</a></li>
            <li className="help-swatchbook-book"><img src="https://fr-assets.com/images/Part-3-zipper-2-p-500.jpeg"/><a className="help-swatchbook" href="/color-houses">Explore Color Houses</a></li>
              <li className="help-swatchbook-book"><img src="https://fr-assets.com/images/Part-3-swatch-2-p-500.jpg"/><a className="help-swatchbook" href="/design-your-bedding">Design Bedding</a></li>
          </ul></div>
          )}
          {colors.map(color => {
            const { _id, name, hexCode, slug, pantoneCode, pdpURL } = color;
            return (
            <div className="cart-items swatch" key={_id}>
              <ColorLink
                _id={_id}
                name={name}
                hexCode={hexCode}
                slug={slug}
                pantoneCode={pantoneCode}
                pdpURL={pdpURL}
                isInSwatchbook={true}
                onSwatchbookRemoveClick={handleSwatchbookRemoveClick}
              />
            </div>
            );
          })}



      </div>
      </div>
    );
  }
}

export default withTracker(props => {
  const user = Meteor.user();
  if (user.profile) {
    const { swatchbookColorIds } = user.profile;
    return {
      colorIds: swatchbookColorIds || []
    };
  } else {
    return {
      colorIds: []
    };
  }

})(SwatchbookContainer);
