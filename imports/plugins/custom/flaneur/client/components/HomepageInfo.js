import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getImageURL } from '../../lib/helpers';

export default class HomepageInfo extends Component {

  static propTypes = {
    info: PropTypes.object.isRequired
  }

  mailChimpInit () {
    !function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/9d3fe8212429db65ff383e4df/2a7ae496a6fc1fd45a2f23f8f.js");
  }

  componentDidMount () {
    this.mailChimpInit();
  }

  render () {
    const {
      title,
      description,
      buttonText,
      linkUrl,
      imageFileId,
      imageFileName
    } = this.props.info;

    let imageUrl = '';
    if (imageFileId) {
      imageUrl = getImageURL(imageFileId, imageFileName);
    }

    return (
<div id="home-info">
<div>
  <div className="homepage_background_tab new-homepage-firsttab new-homepage-nopadding">
    <div className="new-homepage-homepageinfoholder new-homepage-v10">
      <div className="new-homepage-homepage-block-container new-homepage-homepage-block-container-white">  <p className="new-homepage-homepageheader">Lighten Up</p>
        <p className="new-homepage-homepage-body">Flaneur reimagines classic white bedding, because there is no one true shade of white. .</p>
        <a href="/pages/lighten-up" className="new-homepage-homepagecta new-homepage-altcta whitetrans">SHOP</a>
      </div>
    </div>
  </div>
  <div className="homepage_background_tab new-homepage-half new-homepage-top-border">
    <div className="new-homepage-columns-2 new-homepage-noheightlimit2 w-row">
      <div className="new-homepage-column-3 new-homepage-no-heightlimit w-col w-col-6">
        <div><img src="https://fr-assets.com/images/homepage-new/hedonsimloop.gif" width="443" alt=""/></div>
      </div>
      <div className="new-homepage-column-3 new-homepage-no-heightlimit w-col w-col-6">
        <div className="new-homepage-homepageinfoholder new-homepage-v6 new-homepage-no-maxheight">
          <p className="new-homepage-homepageheader">Custom dyed-to-order bedding, in 14 days.</p>
          <div className="new-homepage-homepage-block-container new-homepage-x5">
            <p className="new-homepage-homepage-body new-homepage-justifyleft">Made from 100% Extra-Long-Staple Supima® cotton. Garment dyed to order in Los Angeles.</p>
            <div className="new-homepage-homepage-block-container new-homepage-x5 end-link">
              <a href="/color-houses" className="new-homepage-homepagecta new-homepage-altcta new-homepage-darkborder">FIND YOUR COLOR</a>
              <div className="new-homepage-div-block">
                <p className="new-homepage-paragraph">→</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="new-homepage-div-block-4">
    <a href="/product/tim-clarke" className="new-homepage-homepageheader new-homepage-planned">Shop the Look: Tim Clarke x Flaneur</a>
    <div className="homepage_background_tab new-homepage-border"></div>
    <div className="homepage_background_tab new-homepage-half">
      <p className="new-homepage-homepageheader new-homepage-planned new-homepage-h4">Inspired by California</p>
      <div className="new-homepage-columns-2 new-homepage-half4 w-row">
        <div className="new-homepage-column54 w-col w-col-3">
          <div><img src="https://fr-assets.com/images/homepage-new/biarritzsheet.png" alt=""/>
            <div className="new-homepage-homepage-block-container new-homepage-x5">
              <p className="new-homepage-homepageheader new-homepage-small">Biarritz </p>
              <a href="/product/sheet-set/biarritz" className="new-homepage-homepagecta">Shop →</a>
            </div>
          </div>
        </div>
        <div className="new-homepage-column54 w-col w-col-3"><img src="https://fr-assets.com/images/homepage-new/palosverdestack.png" alt=""/>
          <div className="new-homepage-homepage-block-container new-homepage-x5">
            <p className="new-homepage-homepageheader new-homepage-small">Palos Verdes</p>
            <a href="/product/sheet-set/palos-verdes" className="new-homepage-homepagecta">Shop →</a>
          </div>
        </div>
        <div className="new-homepage-column54 w-col w-col-3"><img src="https://fr-assets.com/images/homepage-new/swannswaysheet.png" alt=""/>
          <div className="new-homepage-homepage-block-container new-homepage-x5">
            <p className="new-homepage-homepageheader new-homepage-small">Swann&#x27;s Way</p>
            <a href="/product/sheet-set/swanns-way" className="new-homepage-homepagecta">Shop →</a>
          </div>
        </div>
        <div className="new-homepage-column-4 w-col w-col-3">
          <div className="new-homepage-homepage-block-container new-homepage-x5 end-link">
            <a href="/product/tim-clarke" className="new-homepage-homepagecta new-homepage-altcta new-homepage-darkborder">SHOP THE Whole LOOK</a>
            <div className="new-homepage-div-block">
              <p data-w-id="08f73ac0-0e8a-1e6c-da52-2ee900241ad6" className="new-homepage-paragraph">→</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="w-embed">

  <div className="homepage_background_tab new-homepage-croppededged new-homepage-nopaddingsides">
    <div className="new-homepage-columns-2 w-row">
      <div className="new-homepage-column-3 new-homepage-withbackground w-col w-col-6">
        <div><img src="https://fr-assets.com/images/homepage-new/1704bluegray.jpg" className="new-homepage-image-2"/></div>
      </div>
      <div className="new-homepage-column-3 new-homepage-infoleft w-col w-col-6">
        <div className="new-homepage-homepage-block-container new-homepage-somepadding">
          <p className="new-homepage-homepageheader"><strong className="new-homepage-homepage-new-bold-text">Form Study in Blue (Extended)</strong></p>
          <p className="new-homepage-homepage-body new-homepage-justifyleft">Experimental approaches are often challenging and exquisitely bold. Explore Flaneur&#x27;s unique engagements in color. </p>
          <a href="/pages/color-study" className="new-homepage-homepagecta new-homepage-altcta new-homepage-darkborder">EXPLORE COLOR STUDIES →</a>
        </div>
      </div>
    </div>
  </div>
  <div className="homepage_background_tab new-homepage-no-height"></div>
  <div className="homepage_background_tab new-homepage-special-no-padding">
    <div className="new-homepage-homepageinfoholder new-homepage-v10 new-homepage-roatic new-homepage-panton">
      <div className="new-homepage-homepage-block-container new-homepage-nopaddingr">
        <p className="new-homepage-homepageheader new-homepage-withpaddingb">What color do you have in mind?</p>
        <p className="new-homepage-homepage-body">Upload an image or supply a Pantone Code and find your perfect colored bedding in no time.</p>
        <a href="/design-your-bedding" className="new-homepage-homepagecta new-homepage-altcta new-homepage-darkborder new-homepage-white cos-white">Create your own shade →</a>
      </div>
    </div>
  </div>
</div>
<div className="homepage_background_tab new-homepage-nofull">
  <div className="new-homepage-columns-2 new-homepage-noheightlimit2 w-row">
    <div className="new-homepage-column-3 new-homepage-v4 new-homepage-c0 new-homepage-nohigh w-col w-col-6">
      <div className="new-homepage-homepage-block-container new-homepage-cry"><img src="https://fr-assets.com/images/homepage-new/BA_0084621_LR.jpg" className="new-homepage-withlowpadding"/>
        <p className="new-homepage-homepageheader new-homepage-h3">Explore the Flaneur Bud to Bed Story</p>
        <p className="new-homepage-homepage-body new-homepage-justifyleft">A sophisticated, traceable supply chain is the backbone of our customization service.</p>
        <a href="/supply-chain" className="new-homepage-homepagecta new-homepage-wide-block">Go →</a>
      </div>
    </div>
    <div className="new-homepage-column-3 new-homepage-no-heightlimit w-col w-col-6">
      <div className="new-homepage-homepage-block-container new-homepage-cry"><img src="https://fr-assets.com/images/homepage-new/esteetalking.jpeg" className="new-homepage-withlowpadding"/>
        <p className="new-homepage-homepageheader new-homepage-h3">The Expert Advice: Color Tips from Designers</p>
        <p className="new-homepage-homepage-body new-homepage-justifyleft">Learn how to use color perfectly in no time with this handy guide.</p>
        <a href="/pages/using-color" className="new-homepage-homepagecta">Go →</a>
      </div>
    </div>
  </div>
</div>
<div className="homepage_background_tab new-homepage-half">
  <p className="new-homepage-homepageheader new-homepage-planned new-homepage-h4">On the blog, Salon</p>
  <div className="new-homepage-columns-2 new-homepage-half4 w-row">
    <div className="new-homepage-column54 w-col w-col-3">
      <div><img src="https://fr-assets.com/images/homepage-new/blogfeature1.png" alt=""/>
        <div className="new-homepage-homepage-block-container new-homepage-x5">
          <p className="new-homepage-homepageheader new-homepage-small">You Need Estee Stanley&#x27;s Tips On Getting The Perfect Modern Bedroom</p>
          <a href="http://salon.hiflaneur.com/you-need-estee-stanley-s-tips-on-getting-the-perfect-modern-bedroom" className="new-homepage-homepagecta">rEAD →</a>
        </div>
      </div>
    </div>
    <div className="new-homepage-column54 w-col w-col-3"><img src="https://fr-assets.com/images/homepage-new/blogfeature2.jpg" alt=""/>
      <div className="new-homepage-homepage-block-container new-homepage-x5">
        <p className="new-homepage-homepageheader new-homepage-small">The Bold Tradition: Incorporating Bright Colors in Classic Design</p>
        <a href="http://salon.hiflaneur.com/the-bold-tradition-incorporating-bright-colors-in-classic-design" className="new-homepage-homepagecta">Read →</a>
      </div>
    </div>
    <div className="new-homepage-column54 w-col w-col-3"><img src="https://fr-assets.com/images/homepage-new/blogfeature3.jpg" alt=""/>
      <div className="new-homepage-homepage-block-container new-homepage-x5">
        <p className="new-homepage-homepageheader new-homepage-small">Exclusive: Step Into Top Designer Bennett Leifer&#x27;s NYC Pied-à-terre</p>
        <a href="http://salon.hiflaneur.com/step-into-top-designer-bennett-leifer-nyc-pied-a-terre" className="new-homepage-homepagecta">read →</a>
      </div>
    </div>
    <div className="new-homepage-column-4 w-col w-col-3">
      <div className="new-homepage-homepage-block-container new-homepage-x5">
        <a href="http://salon.hiflaneur.com" className="new-homepage-homepagecta new-homepage-altcta new-homepage-darkborder">READ mORE →</a>
      </div>
    </div>
  </div>
</div>



        {imageUrl && <img id="home-info-image" src={imageUrl} />}
        <h2>{title}</h2>
        <div id="home-info-content" dangerouslySetInnerHTML={{__html: description}} />
</div>
</div>
    );
  }
}
