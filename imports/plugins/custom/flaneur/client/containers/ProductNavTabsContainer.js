import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from '@reactioncommerce/reaction-components';
import { Products } from '/lib/collections';
import { doesProductHaveOneOfTags } from '/imports/plugins/custom/flaneur/lib/products';

export default class ProductNavTabsContainer extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired
  };

  state = {
    products: []
  };

  constructor (props) {
    super(props);
  }

  async componentDidMount () {
    const products = await this.getProductsList();
    this.setState({ products });
  }

  getProductsList = () => {
    return new Promise((resolve, reject) => {
      Meteor.call('FlaneurProducts.getTabList', (err, products) => {
        if (err) {
          reject(err);
        } else {
          resolve(products);
        }
      });
    });
  }

  handleTabClick = e => {
    e.preventDefault();
    const path = e.target.getAttribute('href');
    ReactionRouter.go(path);
  }

  render () {
    const { product } = this.props;
    const { products } = this.state;

    if (doesProductHaveOneOfTags(product, ['capsule', 'bundle', 'swatch-box', 'swatchbox'])) {
      return ( <div></div> );
    }

    const pathParts = window.location.pathname.split('/');
    const lastPathArg = pathParts[pathParts.length - 1];
    const slug = product.handle || product.slug;    // will be set on handle from Product if admin user, slug from Catalog if non-admin
    const pathColor = lastPathArg !== slug && `/${lastPathArg}` || '';
    return (
      <ul className="nav nav-tabs">
        {products.map(tabProduct => {
          const { title, handle } = tabProduct;
          const isActive = handle === slug;
          return (
            <li key={handle} role="presentation" className={isActive && 'active' || ''}>
              <a href={`/product/${handle}${pathColor}`} onClick={this.handleTabClick}>{title}</a>
            </li>
          );
        })}
      </ul>
    );
  }
}

registerComponent('ProductNavTabsContainer', ProductNavTabsContainer);
