import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import Cookies from 'universal-cookie';
import { Meteor } from "meteor/meteor";
import { setMeta } from '/imports/plugins/custom/flaneur/client/lib/seo';
import HomepageInfo from '../components/HomepageInfo';
import './HomeContainer.less';
import GoogleTagManager from "/client/modules/core/helpers/GoogleTagManager";
import ReactGA from 'react-ga';

const MODAL_COOKIE = '__SUBSCRIBE_MAILCHIMP__';

export default class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      homepageInfo: {},
      showSubscribeMailchimpModal: false,
    };

    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);

    this.cookies = new Cookies();
  }

  componentWillMount () {
    // ReactGA.pageview('/');
  }

  componentDidMount() {
    Meteor.call('Flaneur.getHomepageInfo', (err, homepageInfo) => {
      this.setState({ homepageInfo });
      setMeta('Contemporary Luxury Bedding Company. Custom color, dyed-to-order.');
      // Tell prerender.io that our page is ready
      window.prerenderReady = true;
    });

    const cookieValue = this.cookies.get(MODAL_COOKIE);
    if (!cookieValue) {
      setTimeout(() => {
        this.setState({ showSubscribeMailchimpModal: true });
      }, 5000);
    }
  }

  onOpenModal() {
    this.setState({ showSubscribeMailchimpModal: true });
  }

  onCloseModal() {
    this.cookies.set(MODAL_COOKIE, 'shown');
    this.setState({ showSubscribeMailchimpModal: false });
  }

  render() {
    const { homepageInfo, showSubscribeMailchimpModal } = this.state;
    const event = { platform: 'react-stack' }

    return (

      <div id="home-container">
        {homepageInfo.title && <HomepageInfo info={homepageInfo} />}

        <Modal open={showSubscribeMailchimpModal} onClose={this.onCloseModal} center>
          <div className="subscribe-container">
          <div className="subscribe-left"><img src="https://fr-assets.com/images/bennetzoom2.jpg" className="subscribe-left-image"/></div><div className="subscribe-right">
            <h5>Flaneur in the inbox.</h5>
            <div>
              <div className="text-block footer subscribe_text"><center>Subscribe and enjoy access to private sales, collection announcements, designer interviews, and more.</center>
              </div>
              <div className="w-form">
                <div className="w-row">
                  <div className="mailchimpe-container subscribe-box">
                    <center><MailchimpSubscribe url={Meteor.settings.public.mailchimpFormURL || ''} /></center></div>
                    <div className="no-thanks"><a href="#" onClick={this.onCloseModal}>No thanks.</a></div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </Modal>

        {/* <GoogleTagManager gtmId='GTM-WTCDWDS' scriptId='gtm-script-container' dataLayerName='page view' additionalEvents={event} previewVariables='' /> */}
      </div>
    )
  }
}
