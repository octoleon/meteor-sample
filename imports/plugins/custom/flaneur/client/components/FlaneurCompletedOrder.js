/**
 * @file
 * Customized core CompletedOrder component
 * Added order status
 */


import React, { Component } from "react";
import PropTypes from "prop-types";
import { replaceComponent, Components } from "@reactioncommerce/reaction-components";
import CompletedShopOrders from "/imports/plugins/core/checkout/client/components/completedShopOrders";
import CompletedOrderPaymentMethod from "/imports/plugins/core/checkout/client/components/completedOrderPaymentMethods";
import CompletedOrderSummary from "/imports/plugins/core/checkout/client/components/completedOrderSummary";
import AddEmail from "/imports/plugins/core/checkout/client/components/addEmail";

/**
 * @summary Displays a summary/information about the order the user has just completed
 * @memberof Components
 * @param {Object} props - React PropTypes
 * @property {Object} order - An object representing the order
 * @property {Array} shops - An Array contains information broken down by shop
 * @property {Object} orderSummary - An object containing the items making up the order summary
 * @property {Array} paymentMethod - An array of paymentMethod objects
 * @property {Booleam} isProfilePage - A boolean value that checks if current page is user profile page
 * @return {Node} React node containing the top-level component for displaying the completed order/receipt page
 */
class FlaneurCompletedOrder extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { isActive, index } = this.props;
    if (isActive && index !== 0) {
      this.refs.anchor.scrollIntoView();
    }
  }

  render () {
    const {order, shops, orderSummary, paymentMethods, isProfilePage, isActive } = this.props;
    if (!order) {
      return (
        <Components.NotFound
          i18nKeyTitle="order.notFound"
          icon="fa fa-barcode"
          title="Order Not Found"
        />
      );
    }

    let headerText;

    if (isProfilePage) {
      headerText = (<p className="order-id"><strong>Order ID </strong><span className="status-label">{order._id}</span></p>);
    } else {
      headerText = (
        <div className="order-details-header">
          {/* This is the left side / main content */}
          <h3><Components.Translation defaultValue="Thank You" i18nKey={"cartCompleted.thankYou"} /></h3>
          <p><strong>Order ID </strong>{order._id}</p>
          {/* show a different message depending on whether we have an email or not */}
          <AddEmail order={order} orderEmail={order.email} />
          {/* This is the left side / main content*/}
        </div>
      );
    }

    let { status, workflow } = order.workflow;
    if (status === 'coreOrderWorkflow/canceled') {
      status = 'canceled'
    }
    if (status === 'coreOrderWorkflow/completed') {
      status = 'completed'
    }
    if (status === 'coreOrderWorkflow/processing') {
      status = 'processing'
    }
    const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);

    const garment_dye_and_wash = workflow.includes('Garment Dye & Wash');
    const press_and_fold = workflow.includes('Press & Fold');
    const quality_check = workflow.includes('Quality Check');
    const order_shipped = workflow.includes('coreOrderWorkflow/completed');

    return (
      <div className="tab-r">
        { isActive ? (
          <input id={order._id}
          type="checkbox" name="tabs2" defaultChecked />
        ) : (
          <input id={order._id}
          type="checkbox" name="tabs2" />
          )
        }
        <label for={order._id}>
          <div className="order-details-header" ref="anchor">
            <div className="order-details-header-left">{ headerText }</div>
            <div className="order-details-header-right">
              <span className="details-line">View Details</span>
            </div>
          </div>
        </label>
        <div className="tab-content">
          <div className="container order-completed">
            <p><strong>Status:</strong> <span className="status-label">{statusLabel}</span></p>
            <div className="order-tracking-row w-row">
              <div className="order-status-bg-blue column-14 w-col w-col-2 w-col-small-6 w-col-tiny-6">
                <div className="order-breadcrumb with-child">
                  <h5 className="order-breadcrumb-title" style={{ color: '#fff' }}>Order Received</h5>
                </div>
                <div className="order-breadcrumb child"></div>
              </div>
              <div className={"order-status-bg-grey column-14 w-col w-col-3 w-col-small-6 w-col-tiny-6 " + (garment_dye_and_wash ? 'order-status-bg-blue' : '')}>
                <div className="order-breadcrumb with-child">
                  <h5 className="order-breadcrumb-title" style={{ color: garment_dye_and_wash ? '#fff' : '#000' }}>Garment Dye & Wash</h5>
                </div>
                <div className="order-breadcrumb child"></div>
              </div>
              <div className={"order-status-bg-grey column-14 w-col w-col-2 w-col-small-6 w-col-tiny-6 " + (press_and_fold ? 'order-status-bg-blue' : '')}>
                <div className="order-breadcrumb with-child">
                  <h5 className="order-breadcrumb-title" style={{ color: press_and_fold ? '#fff' : '#000' }}>Press & Fold</h5>
                </div>
                <div className="order-breadcrumb child"></div>
              </div>
              <div className={"order-status-bg-grey column-14 w-col w-col-2 w-col-small-6 w-col-tiny-6 " + (quality_check ? 'order-status-bg-blue' : '')}>
                <div className="order-breadcrumb with-child">
                  <h5 className="order-breadcrumb-title" style={{ color: quality_check ? '#fff' : '#000' }}>Quality Check</h5>
                </div>
                <div className="order-breadcrumb child"></div>
              </div>
              <div className={"order-status-bg-grey column-14 w-col w-col-2 w-col-small-6 w-col-tiny-6 " + (order_shipped ? 'order-status-bg-blue' : '')}>
                <div className="order-breadcrumb with-child">
                  <h5 className="order-breadcrumb-title" style={{ color: order_shipped ? '#fff' : '#000' }}>Order Shipped</h5>
                </div>
              </div>
            </div>
            <div className="order-details-main">
              <div className="order-details-content-title">
                <p><Components.Translation defaultValue="Your Items" i18nKey={"cartCompleted.yourItems"} /></p>
              </div>
              {shops.map((shop) => {
                const shopKey = Object.keys(shop);
                return (
                  <CompletedShopOrders
                    shopName={shop[shopKey].name}
                    items={shop[shopKey].items}
                    key={shopKey}
                    shippingMethod={shop[shopKey].shippingMethod}
                    isProfilePage={isProfilePage}
                  />
                );
              })}
            </div>
            <div className="order-details-side">
              {/* This is the right side / side content */}
              <div className="shipping-payment-details">
                <div className="shipping-info">
                  <div className="order-details-content-title">
                    <p> <Components.Translation defaultValue="Shipping Address" i18nKey={"cartCompleted.shippingAddress"} /></p>
                  </div>
                  {orderSummary.shipping.map((shipment) => {
                    if (shipment.address.fullName || shipment.address.address1) {
                      return <div className="order-details-info-box" key={shipment._id}>
                        <div className="order-details-info-box-content">
                          <p>
                            {shipment.address.fullName}<br/>
                            {shipment.address.address1} {shipment.address.address2}<br/>
                            {shipment.address.city}, {shipment.address.region} {shipment.address.postal} {shipment.address.country}
                          </p>
                        </div>
                      </div>;
                    }
                    return null;
                  })}
                </div>

                <div className="payment-info">
                  <div className="order-details-content-title">
                    <p><Components.Translation defaultValue="Payment Method" i18nKey={"cartCompleted.paymentMethod"} /></p>
                  </div>
                  {paymentMethods.map((paymentMethod) => <CompletedOrderPaymentMethod key={paymentMethod.key} paymentMethod={paymentMethod} />)}
                </div>
              </div>
              <CompletedOrderSummary shops={shops} orderSummary={orderSummary} isProfilePage={isProfilePage} />
                {/* This is the right side / side content */}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

FlaneurCompletedOrder.propTypes = {
  isProfilePage: PropTypes.bool,
  order: PropTypes.object,
  orderSummary: PropTypes.object,
  paymentMethods: PropTypes.array,
  shops: PropTypes.array,
  isActive: PropTypes.bool
};

replaceComponent('CompletedOrder', FlaneurCompletedOrder);

export default FlaneurCompletedOrder;
