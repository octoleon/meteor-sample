import React, { Component, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import MailchimpSubscribe from "react-mailchimp-subscribe"

export default class Footer extends Component {

  render () {
    return (
<Fragment>

      <div className="new-homepage-primary-footer-section">
        <div className="new-homepage-div-block-7">
          <div className="new-homepage-footer-total-container w-row">
            <div className="new-homepage-footer-links-container w-col w-col-8">
              <div className="new-homepage-columns-4 w-row">
                <div className="new-homepage-footercolumn w-col w-col-3">
                  <div className="new-homepage-footer-column">
                    <ul className="new-homepage-footer-list w-list-unstyled">
                      <li className="new-homepage-footer_list_item"><a href="/pages/contact-us" className="new-homepage-footer_link">Color Consultation</a></li>
                      <li className="new-homepage-footer_list_item"><a href="/design-your-bedding" className="new-homepage-footer_link">Design Your Bedding</a></li>
                      <li className="new-homepage-footer_list_item"><a href="/pages/using-color" className="new-homepage-footer_link">Color Tips</a></li>
                    </ul>
                  </div>
                </div>
                <div className="new-homepage-footercolumn w-col w-col-3">
                  <div className="new-homepage-footer-column">
                    <ul className="new-homepage-footer-list w-list-unstyled">
                      <li className="new-homepage-footer_list_item"><a href="/pages/about-us" className="new-homepage-footer_link">About Us</a></li>
                      <li className="new-homepage-footer_list_item"><a href="/pages/press" className="new-homepage-footer_link">Media Coverage</a></li>
                      <li className="new-homepage-footer_list_item"><a href="/supply-chain" className="new-homepage-footer_link">Bud-to-Bed</a></li>
                    </ul>
                  </div>
                </div>
                <div className="new-homepage-footercolumn w-col w-col-3">
                  <div className="new-homepage-footer-column">
                    <ul className="new-homepage-footer-list w-list-unstyled">
                      <li className="new-homepage-footer_list_item"><a href="/pages/shipping-and-return" className="new-homepage-footer_link">Shipping</a></li>
                      <li className="new-homepage-footer_list_item"><a href="/pages/faqs" className="new-homepage-footer_link">FAQ</a></li>
                      <li className="new-homepage-footer_list_item"><a href="/pages/contact-us" className="new-homepage-footer_link">Contact</a></li>
                    </ul>
                  </div>
                </div>
                <div className="new-homepage-footercolumn w-col w-col-3">
                  <div className="new-homepage-footer-column">
                    <ul className="new-homepage-footer-list w-list-unstyled">

                      <li className="new-homepage-footer_list_item"><a href="/pages/contact-us" className="new-homepage-footer_link">Trade</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="new-homepage-socials-container"><a href="https://www.twitter.com/flaneurnyc"><img src="https://fr-assets.com/images/homepage-new/twittericon.png" width="322" className="new-homepage-socialicon new-homepage-first"/></a><a href="https://www.instagram.com/flaneurnyc"><img src="https://fr-assets.com/images/homepage-new/instagram-icon.png" width="322" className="new-homepage-socialicon"/></a><a href="https://www.vimeo.com/flaneurnyc"><img src="https://fr-assets.com/images/homepage-new/vimeoicon.png" className="new-homepage-socialicon"/></a><a href="https://www.facebook.com/hiflaneur"><img src="https://fr-assets.com/images/homepage-new/facebookicon.png" width="322" className="new-homepage-socialicon"/></a></div>
            </div>
            <div className="new-homepage-footer-promisecolumn w-col w-col-4"><img src="https://fr-assets.com/images/homepage-new/FOOTERLAMBBLUE.png" width="150" alt="" className="new-homepage-footer-promise-head"/>
              <p className="new-homepage-footer-promise-body">Flaneur DNA tests every batch of 100% Extra-Long-Staple Supima® cotton to ensure the purity. Every product is garment dyed to order and pre-washed  in Los Angeles. </p><img src="https://fr-assets.com/images/homepage-new/BLUELINEONLY.png" width="150" alt="" className="new-homepage-footer-promise-head"/></div>
          </div>
        </div>
      </div>
        <div id="copyright-container">
          <div id="copyright">
            <p>&copy; {new Date().getFullYear()} Flaneur. All rights reserved. <a href="/pages/privacy-policy">Privacy</a>. By using this site, you agree to our <a href="/pages/terms">Terms of Use</a>.</p>
          </div>
        </div>
      </Fragment>
    )
  }
}
