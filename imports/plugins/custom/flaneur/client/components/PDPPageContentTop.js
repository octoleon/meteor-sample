import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from '@reactioncommerce/reaction-components';

class PDPPageContentTop extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired
  };

  render () {
    const { product } = this.props;
    const { pageContentTop } = product;

    return (
      <div>
        {pageContentTop && (
          <div className="content" dangerouslySetInnerHTML={{__html: pageContentTop}} />
        )}
      </div>
    );
  }
}

registerComponent('PDPPageContentTop', PDPPageContentTop);

export default PDPPageContentTop;
