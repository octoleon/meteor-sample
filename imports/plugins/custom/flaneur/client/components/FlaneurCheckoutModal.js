import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";
import { CartDrawer}  from "imports/plugins/core/checkout/client/components/cartDrawer.js"


class FlaneurCheckoutModal extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <CartDrawer showModal={this.showModal} style={{visibility: this.props.showModal ? "visible": "hidden"}} />
        )
    }

}

export default FlaneurCheckoutModal
