import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

class SwatchbookLinkContainer extends Component {

  static propTypes = {
    colorCount: PropTypes.number.isRequired
  }

  state = {
    isOpen: false
  };

  handleSwatchViewClick = e => {
    e.preventDefault();
    const { isOpen } = this.state;
    const swatchbookDrawer = $('.swatchbook-drawer-container');

    if (isOpen) {
      swatchbookDrawer.fadeOut();
    } else {
      swatchbookDrawer.fadeIn();
    }

    this.setState({ isOpen: !isOpen });
  };

  render () {
    const { colorCount } = this.props;
    return (
      <Fragment>
        &nbsp;
        <a
          href="javascript:void(0)"
          className="swatchbook-link"
          onClick={this.handleSwatchViewClick}><img src="https://uploads-ssl.webflow.com/5bb3c7462318764598407e29/5c379695d8ed0bbca01526cd_hearticon.png"/>({colorCount})</a>
      </Fragment>

    );
  }
}

export default withTracker(props => {
  const user = Meteor.user();

  if (user.profile) {
    let { swatchbookColorIds } = user.profile;

    if (!swatchbookColorIds) {
      swatchbookColorIds = [];
    }

    return {
      colorCount: swatchbookColorIds.length
    };
  } else {
    return {
      colorCount: 0
    };
  }

})(SwatchbookLinkContainer);
