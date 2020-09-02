import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";

/**
 * @summary React component to log in and see status of single order
 * @memberof Accounts
 * @extends {Component}
 * @property {Function} handleOrderIdSubmit - Required: Order ID submit function
 */
class SingleOrder extends Component {
  static propTypes = {
    handleOrderIdSubmit: PropTypes.func,
    orderId: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      orderId: this.props.orderId,
      isValid: true
    };
  }

  /**
   * @method handleFieldChange
   * @summary Handle setting state whenever the field on the form change
   * @param {Event} event - the event that fired
   * @param {String} value - the new value for the field
   * @param {String} field - which field to modify it's value
   * @return {undefined} undefined
   * @private
   */
  handleFieldChange = (event, value, field) => {
    this.setState({
      [field]: value,
      isValid: true
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.orderId) {
      this.setState({
        isValid: false
      });
    } else {
      this.setState({
        isValid: true
      });
      this.props.handleOrderIdSubmit(event, this.state.orderId);
    }
  }

  render() {
    const validation = {
      messages: {
        orderId: {
          message: "Enter your order ID"
        }
      }
    };

    return (
      <div className="accounts-dialog accounts-single-order">
        <div className="order-login">
            <Components.Login
              loginFormCurrentView="loginFormSignInView"
            />
          </div>
        <div className="order-status">
          <div className="loginForm-title">
            <h2>
              <Components.Translation defaultValue="Status of a Single Order"/>
            </h2>
          </div>
          <p className="text-justify">
            <Components.Translation
              defaultValue="View the status of a Single Order by entering your order number and billing zip code below."
            />
          </p>
          <form onSubmit={this.handleSubmit} className="login-form">
            <div className="form-group">
              <Components.TextField
                name="orderId"
                label="Order Number"
                value={this.state.orderId}
                onChange={this.handleFieldChange}
                isValid={this.state.isValid}
                validation={validation}
              />
            </div>
            <div className="form-group">
              <Components.Button
                className="btn-block"
                primary={true}
                bezelStyle="solid"
                label="Show Order Status"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SingleOrder;
