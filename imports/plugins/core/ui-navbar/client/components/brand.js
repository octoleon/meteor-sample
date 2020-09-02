import React, { Component } from "react";
import PropTypes from "prop-types";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api";

class Brand extends Component {
  static propTypes = {
    logo: PropTypes.string,
    title: PropTypes.string
  }

  handleClick = (event) => {
    event.preventDefault();
    Reaction.Router.go("/");
  }

  render() {
    const { logo, title } = this.props;

    return (
      <a className="brand" href="/" onClick={this.handleClick}>
        {this.props.logo &&
          <div className="logo">
            <img src={logo} alt={title} />
          </div>
        }
        <div className="brand-container">
        <span className="title"><img id="brand_image" src="https://fr-assets.com/images/Flaneur-logo-blue.png" /></span></div>
      </a>
    );
  }
}

registerComponent("Brand", Brand);

export default Brand;
