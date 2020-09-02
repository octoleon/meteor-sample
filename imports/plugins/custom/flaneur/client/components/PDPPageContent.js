import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from '@reactioncommerce/reaction-components';

class PDPPageContent extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired
  };

  render () {
    const { product } = this.props;
    const { pageContent } = product;

    return (
      <div>
        {pageContent && (
          <div className="content" dangerouslySetInnerHTML={{__html: pageContent}} />
        )}
      </div>
    );
  }
}

registerComponent('PDPPageContent', PDPPageContent);

export default PDPPageContent;
