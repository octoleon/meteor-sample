import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from '@reactioncommerce/reaction-components';
import { getPDPColorSlug } from '../../lib/helpers';
import { isProductCapsule } from '../../lib/products';

class PDPTitleInColor extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired
  };

  state = {
    name: '',
    slug: ''
  };

  componentDidMount () {
    if (!isProductCapsule(this.props.product)) {
      this.getColorName();
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.product._id !== prevProps.product._id) {
      // Changed product
      this.setState({ name: '', slug: '' });
    }
    if (!isProductCapsule(this.props.product)) {
      this.getColorName();
    }
  }

  getColorName = () => {
    const { handle } = this.props.product;
    const slug = getPDPColorSlug(handle);
    if (slug && slug !== this.state.slug) {
      Meteor.call('Colors.getNameBySlug', slug, (err, name) => {
        if (err) {
          alert(err.reason);
        } else {
          this.setState({ name, slug });
        }
      });
    }
  };

  render () {
    const { title } = this.props.product;
    const { name } = this.state;
    return (
      <div>
        {name && (
          <h3 className="pdp field title pdp-title-in-color">{title} in {name}</h3>
        )}
      </div>
    )
  }
}

registerComponent('PDPTitleInColor', PDPTitleInColor);

export default PDPTitleInColor;
