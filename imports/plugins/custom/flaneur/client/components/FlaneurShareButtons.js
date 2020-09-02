import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import { registerComponent } from '@reactioncommerce/reaction-components';
import ShareButton from 'react-social-share-buttons'

class FlaneurShareButtons extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired,
    colorId: PropTypes.string
  };

    handleColorClick = (e, pdpURL) => {
      e.preventDefault();
      ReactionRouter.go(pdpURL);
    };

  state = {
    pdpURL: ''
  } 

  componentDidUpdate (prevProps) {
    const { product, colorId } = this.props;
    const { handle } = product;
    const firstProductURL = `/product/${handle}`;
    
    const hasProductChanged = product._id !== prevProps.product._id;
    const hasColorIdChanged = colorId !== prevProps.colorId;
    if (hasProductChanged || hasColorIdChanged) {      
      Meteor.call('Flaneur.getColorSlug', colorId, (err, slug) => {        
        this.setState ({
          pdpURL: `${firstProductURL}/${slug}`
        });
      });      
    }    
  }

  render () {
    const { pdpURL } = this.state;
    const url = "https://www.hiflaneur.com" + pdpURL;
    return (
      <div className="share-buttons">
          Share
          <ShareButton
              compact
              socialMedia={'facebook'}
              url={url}
              text="Check out this beautiful product from Flaneur!</a>"
              id="share-facebook"
          />
          <ShareButton
              compact
              socialMedia={'twitter'}
              url={url}
              text="Check out this beautiful product from Flaneur!"
          />
          <ShareButton
              compact
              socialMedia={'pinterest'}
              url={url}
              text="Check out this beautiful product from Flaneur!"
          />
      </div>
    );
  }
}

registerComponent('FlaneurShareButtons',
  withTracker(props => {
    const colorId = Session.get('PDPColorId');
    return {
      colorId
    }
  })(FlaneurShareButtons)
);
