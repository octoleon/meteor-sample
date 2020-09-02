import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ColorHouses from '../components/ColorHouses';
import { setMeta } from '/imports/plugins/custom/flaneur/client/lib/seo';
import handleSwatchbookAddClick from '/imports/plugins/custom/swatchbook/client/lib/handleSwatchbookAddClick';
import handleSwatchbookRemoveClick from '/imports/plugins/custom/swatchbook/client/lib/handleSwatchbookRemoveClick';
import ReactGA from 'react-ga';

class ColorHousesContainer extends Component {

  static propTypes = {
    swatchbookColorIds: PropTypes.array.isRequired
  };

  state = {
    colorHouses: []
  };

  componentWillMount () {
    ReactGA.pageview('/color-houses');
  }

  componentDidMount () {
    Meteor.call('ColorHouses.get', (err, colorHouses) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ colorHouses });
        setMeta('Color Houses');
        // Tell prerender.io that our page is ready
        window.prerenderReady = true;
      }
    });
  }

  render () {
    const { colorHouses } = this.state;
    const { swatchbookColorIds } = this.props;

    return (
      <ColorHouses
        colorHouses={colorHouses}
        swatchbookColorIds={swatchbookColorIds}
        onSwatchbookAddClick={handleSwatchbookAddClick}
        onSwatchbookRemoveClick={handleSwatchbookRemoveClick}
      />
    );
  }
}

export default withTracker(props => {
  const user = Meteor.user();

  if (user.profile) {
    const { swatchbookColorIds } = user.profile;
    return {
      swatchbookColorIds: swatchbookColorIds || []
    };
  } else {
    return {
      swatchbookColorIds: []
    };
  }

})(ColorHousesContainer);
