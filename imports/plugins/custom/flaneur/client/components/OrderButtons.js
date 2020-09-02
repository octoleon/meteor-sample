import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class OrderButtons extends Component {

  static propTypes = {
    order: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
  }

  handleAcknowledgeClick = e => {
    Meteor.call('FlaneurOrders.acknowledge', this.props.order._id, err => {
      if (err) {
        alert(err.reason);
      } else {
        Alerts.toast('Acknowledgement email sent');
      }
    });
  };

  handlePressFoldClick = e => {
    Meteor.call('FlaneurOrders.pressfold', this.props.order._id, err => {
      if (err) {
        alert(err.reason);
      } else {
        Alerts.toast('Press & Fold email sent');
      }
    });
  };

  handleQualityCheckClick = e => {
    Meteor.call('FlaneurOrders.qualitycheck', this.props.order._id, err => {
      if (err) {
        alert(err.reason);
      } else {
        Alerts.toast('Quality Check email sent');
      }
    });
  };

  handleNewOrderResendClick = e => {
    Meteor.call('FlaneurOrders.newresend', this.props.order._id, err => {
      if (err) {
        alert(err.reason);
      } else {
        Alerts.toast('Resent Confirmation Email');
      }
    });
  };

  handleNewOrderResendAdminClick = e => {
    Meteor.call('FlaneurOrders.newresendAdmin', this.props.order._id, err => {
      if (err) {
        alert(err.reason);
      } else {
        Alerts.toast('Resent Confirmation Email');
      }
    });
  };

  handleToggleException = e => {
    Meteor.call('FlaneurOrders.toggleException', this.props.order._id, err => {
      if (err) {
        alert(err.reason);
      }
    });
  };

  render () {
    const { order } = this.props;
    const { status } = order.workflow;
    return (
      <div style={{ marginTop: 20 }}>
        {status === 'coreOrderWorkflow/processing' && (
          <button
            style={{ width: '100%' }}
            className="btn btn-primary"
            onClick={this.handleAcknowledgeClick}
          >
            Entered Garment Dye & Wash
          </button>
        )}
        {(status !== 'coreOrderWorkflow/processing' &&
          status !== 'exception') && (
          <button
            className="btn btn-default"
            style={{ width: '100%' }}
            onClick={this.handleAcknowledgeClick}
          >
            Resend Garment Dye & Wash
          </button>
        )}

        <button
          className="btn btn-default"
          style={{ width: '100%', marginTop: 20 }}
          onClick={this.handlePressFoldClick}
        >
          Press & Fold
        </button>

        <button
          className="btn btn-default"
          style={{ width: '100%', marginTop: 20 }}
          onClick={this.handleQualityCheckClick}
        >
          Quality Check
        </button>

        <button
          className="btn btn-default"
          style={{ width: '100%', marginTop: 20 }}
          onClick={this.handleNewOrderResendClick}
        >
          Resend Confirmation Email To Customer
        </button>

        <button
          className="btn btn-default"
          style={{ width: '100%', marginTop: 20 }}
          onClick={this.handleNewOrderResendAdminClick}
        >
          Resend Confirmation Email To Admin
        </button>

        {status !== 'exception' && (
          <button
            style={{ width: '100%', marginTop: 20 }}
            className="btn btn-danger"
            onClick={this.handleToggleException}
          >
            Mark Swatch Shipped
          </button>
        )}
        {status === 'exception' && (
          <button
            style={{ width: '100%', border: '1px solid #eb4d5c', marginTop: 20 }}
            className="btn btn-default"
            onClick={this.handleToggleException}
          >
            Clear Exception
          </button>
        )}
      </div>
    );
  }
}
