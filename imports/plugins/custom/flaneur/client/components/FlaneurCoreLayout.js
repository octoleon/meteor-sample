/**
 * @file
 * Customized version of coreLayout component
 * Added custom Footer component
 */

import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { getComponent, replaceComponent } from "@reactioncommerce/reaction-components";
import Blaze from "meteor/gadicc:blaze-react-component";
import { Template } from "meteor/templating";
// Customization - include custom footer component
import Footer from './Footer';

class FlaneurCoreLayout extends React.Component {
  constructor(props) {
    super(props);

    const { structure } = this.props;
    const { layoutHeader, layoutFooter } = structure || {};

    const headerComponent = layoutHeader && getComponent(layoutHeader);
    const footerComponent = layoutFooter && getComponent(layoutFooter);

    if (headerComponent) {
      this.headerComponent = React.createElement(headerComponent, {});
    }

    if (footerComponent) {
      this.footerComponent = React.createElement(footerComponent, {});
    }
  }

  render() {
    const { actionViewIsOpen, structure } = this.props;
    const { template } = structure || {};

    const pageClassName = classnames({
      "page": true,
      "show-settings": actionViewIsOpen
    });

    let mainNode = null;
    try {
      const mainComponent = getComponent(template);
      mainNode = React.createElement(mainComponent, {});
    } catch (error) {
    //  Probe for Blaze template (legacy)
      if (Template[template]) {
        mainNode = <Blaze template={template} />;
      }
    }

    return (
      <div className={pageClassName} id="reactionAppContainer">

        {this.headerComponent}

        <Blaze template="cartDrawer" className="reaction-cart-drawer" />

        <main>
          {mainNode}
        </main>

        <Footer />
      </div>
    );
  }
}

FlaneurCoreLayout.propTypes = {
  actionViewIsOpen: PropTypes.bool, // eslint-disable-line react/boolean-prop-naming
  data: PropTypes.object,
  structure: PropTypes.object
};

replaceComponent("coreLayout", FlaneurCoreLayout);

export default FlaneurCoreLayout;
