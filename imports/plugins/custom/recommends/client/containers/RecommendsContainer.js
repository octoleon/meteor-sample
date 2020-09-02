import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Recommends from '../components/Recommends';
import { setMeta } from '/imports/plugins/custom/flaneur/client/lib/seo';
import handleSwatchbookAddClick from '/imports/plugins/custom/swatchbook/client/lib/handleSwatchbookAddClick';
import handleSwatchbookRemoveClick from '/imports/plugins/custom/swatchbook/client/lib/handleSwatchbookRemoveClick';

class RecommendsContainer extends Component {

  static propTypes = {
    swatchbookColorIds: PropTypes.array.isRequired
  };

  state = {
    recommends: []
  };

  componentDidMount () {
    Meteor.call('Recommends.get', (err, recommends) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ recommends });
        setMeta('Flaneur Recommends');
        // Tell prerender.io that our page is ready
        window.prerenderReady = true;
      }
    });
  }

  render () {
    const { recommends } = this.state;
    const { swatchbookColorIds } = this.props;

    return (
      <Recommends
        recommends={recommends}
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

})(RecommendsContainer);
