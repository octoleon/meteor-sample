import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import { registerComponent } from '@reactioncommerce/reaction-components';
import { getPDPColorSlug } from '../../lib/helpers';
import { isProductCapsule } from '../../lib/products';

class PDPColorDescription extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired,
    colorId: PropTypes.string
  };

  state = {
    colorDescription: ''
  };

  componentDidMount () {
    this.loadColorDescription();

    const { product } = this.props;
    // If product has a hexColor defined by admin, set that color.
    if (isProductCapsule(product) && product.hexColor) {
      this.setHexColor(product.hexColor);
    }

    // Otherwise, set color based on URL
    const { handle } = product;
    const slug = getPDPColorSlug(handle);
    if (slug) {
      // Viewing PDP in a certain color.
      // Load color and set hex background on various elements
      Meteor.call('Colors.getBySlug', slug, (err, { _id, hexCode }) => {
        if (err) {
          alert(err.reason);
        } else {
          this.setHexColor(hexCode);
        }
      });
    }
  }

  componentDidUpdate (prevProps) {
    const { product, colorId } = this.props;
    const hasProductChanged = product._id !== prevProps.product._id;
    const hasColorIdChanged = colorId !== prevProps.colorId;
    if (hasProductChanged || hasColorIdChanged) {
      this.loadColorDescription();
    }
  }

  setHexColor = hex => {
    console.log('hex', hex);
    // clear colors
    const existingStyles = document.querySelector('.pdp-info-tab-color-styles');
    if (existingStyles) {
      existingStyles.parentNode.removeChild(existingStyles);
    }
    // set colors
    const labelStyle = `background-color: #fffcf5 !important; color:#000;`;
    const descriptionStyle = `background-color: #fffcf5 !important; color:#000;`;
    const styles = document.createElement('style');
    styles.type = 'text/css';
    styles.className = 'pdp-info-tab-color-styles';
    styles.appendChild(document.createTextNode(`
      .pdp-tab-container .tab label { ${labelStyle} }
      .pdp-tab-container .tab .tab-description { ${descriptionStyle} }
    `));
    document.head.appendChild(styles);
  }

  loadColorDescription = () => {
    const { colorId } = this.props;
    if (!colorId) {
      return;
    }

    Meteor.call('Colors.getDescription', colorId, (err, colorDescription) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ colorDescription });
      }
    });
  };

  render () {
    const { product } = this.props;
    const { description } = product;
    const { colorDescription } = this.state;

    const tabs = [{
      field: 'description',
      label: 'Description'
    }];


    return (
      <div className="pdp-tab-container">
        {tabs.map(tab => {
          const { field, label } = tab;
          const tabId = `tab-${field}`;
          let content = product[field];
          if (field === 'colorDescription') {
            content = colorDescription;
          }
          return (
            <div className="hello" key="colorDescription">

              <div>
                <p dangerouslySetInnerHTML={{ __html: colorDescription }} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

registerComponent('PDPColorDescription',
  withTracker(props => {
    const colorId = Session.get('PDPColorId');
    return {
      colorId
    }
  })(PDPColorDescription)
);
