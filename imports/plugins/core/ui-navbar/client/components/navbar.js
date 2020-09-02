/**
 * @file
 * Customized core Reaction Commerce NavBar component.
 * Separated out cart into own line + replaced tag-based nav w/ custom main menu (see main-menu plugin).
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components, replaceComponent } from "@reactioncommerce/reaction-components";
import MainMenu from '/imports/plugins/custom/flaneur/client/components/MainMenu';
import SwatchbookContainer from '/imports/plugins/custom/swatchbook/client/containers/SwatchbookContainer';
import SwatchbookLinkContainer from '/imports/plugins/custom/swatchbook/client/containers/SwatchbookLinkContainer';

class NavBar extends Component {
  static propTypes = {
    brandMedia: PropTypes.object,
    hasProperPermission: PropTypes.bool,
    searchEnabled: PropTypes.bool,
    shop: PropTypes.object,
    visibility: PropTypes.object.isRequired
  };

  static defaultProps = {
    visibility: {
      hamburger: true,
      brand: true,
      tags: true,
      search: true,
      notifications: true,
      languages: true,
      currency: true,
      mainDropdown: true,
      cartContainer: true
    }
  };

  state = {
    navBarVisible: false,
    searchModalOpen: false,
    // Customization
    mainMenu: [],
    featureLine: {}
  }

  componentDidMount () {
    // Customization - load and set main menu
    Meteor.call('MainMenu.get', (err, mainMenu) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ mainMenu });
      }
    });

    $(document).ready(function(){
    $(".red-s").mouseover(function(){
        $(".dropdown-menu-column.center-block.alt").removeClass("list-link-blank").addClass("list-link-current-hedonism")
    });
    $(".red-s").mouseout(function(){
      $(".dropdown-menu-column.center-block.alt").removeClass("list-link-current-hedonism").addClass("list-link-blank")
    });
     $(".lighten-up-link").mouseover(function(){
        $(".dropdown-menu-column.center-block.alt").removeClass("list-link-blank").addClass("list-link-current-lighten-up")
    });
    $(".lighten-up-link").mouseout(function(){
      $(".dropdown-menu-column.center-block.alt").removeClass("list-link-current-lighten-up").addClass("list-link-blank")
        });
      $(".trigger-tim-clarke").mouseover(function(){
        $(".dropdown-menu-column.center-block.alt").removeClass("list-link-blank").addClass("list-link-tim-clarke")
    });
    $(".trigger-tim-clarke").mouseout(function(){
      $(".dropdown-menu-column.center-block.alt").removeClass("list-link-tim-clarke").addClass("list-link-blank")

    });
     $(".trigger-bennett-leifer").mouseover(function(){
        $(".dropdown-menu-column.center-block.alt").removeClass("list-link-blank").addClass("list-link-bennett-leifer")
    });
    $(".trigger-bennett-leifer").mouseout(function(){
      $(".dropdown-menu-column.center-block.alt").removeClass("list-link-bennett-leifer").addClass("list-link-blank")

    });
     $(".trigger-sasha-bikoff").mouseover(function(){
        $(".dropdown-menu-column.center-block.alt").removeClass("list-link-blank").addClass("list-link-sasha-bikoff")
    });
    $(".trigger-sasha-bikoff").mouseout(function(){
      $(".dropdown-menu-column.center-block.alt").removeClass("list-link-sasha-bikoff").addClass("list-link-blank")

    });
    $(".trigger-sophie-donelson").mouseover(function(){
        $(".dropdown-menu-column.center-block.alt").removeClass("list-link-blank").addClass("list-link-sophie-donelson")
    });
    $(".trigger-sophie-donelson").mouseout(function(){
      $(".dropdown-menu-column.center-block.alt").removeClass("list-link-sophie-donelson").addClass("list-link-blank")

    });
    $(".trigger-estee-stanley").mouseover(function(){
        $(".dropdown-menu-column.center-block.alt").removeClass("list-link-blank").addClass("list-link-estee-stanley")
    });
    $(".trigger-estee-stanley").mouseout(function(){
      $(".dropdown-menu-column.center-block.alt").removeClass("list-link-estee-stanley").addClass("list-link-blank")

    });
     $(".trigger-color-study-1").mouseover(function(){
        $(".dropdown-menu-column.center-block.alt").removeClass("list-link-blank").addClass("list-link-color-study-1")
    });
    $(".trigger-color-study-1").mouseout(function(){
      $(".dropdown-menu-column.center-block.alt").removeClass("list-link-color-study-1").addClass("list-link-blank")

    });
  });

    // Customization - load and set feature line
    Meteor.call('Flaneur.getFeatureLine', (err, featureLine) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ featureLine });
      }
    });
  }

  toggleNavbarVisibility = () => {
    const isVisible = this.state.navBarVisible;
    this.setState({ navBarVisible: !isVisible });
  }

  handleCloseNavbar = () => {
    this.setState({ navBarVisible: false });
  }

  handleOpenSearchModal = () => {
    this.setState({ searchModalOpen: true });
  }

  handleCloseSearchModal = () => {
    this.setState({ searchModalOpen: false });
  }

  renderLanguage() {
    return (
      <div className="languages">
        <Components.LanguageDropdown />
      </div>
    );
  }

  renderCurrency() {
    return (
      <div className="currencies">
        <Components.CurrencyDropdown />
      </div>
    );
  }

  renderBrand() {
    const { brandMedia, shop } = this.props;

    const { name } = shop || {};
    const logo = brandMedia && brandMedia.url({ store: "large" });

    return (
      <Components.Brand
        logo={logo}
        title={name || ""}
      />
    );
  }

  renderSearchButton() {
    if (this.props.searchEnabled) {
      return (
        <div className="search">
          <Components.FlatButton
            icon="fa fa-search"
            kind="flat"
            onClick={this.handleOpenSearchModal}
          />
          <Components.SearchSubscription
            open={this.state.searchModalOpen}
            onClose={this.handleCloseSearchModal}
          />
        </div>
      );
    }
  }

  renderNotificationIcon() {
    if (this.props.hasProperPermission) {
      return (
        <div className="navbar-notification">
          <Components.Notification />
        </div>
      );
    }
  }

  renderCartContainerAndPanel() {
    // Customization - Added SwatchbookLinkContainer
    return (
      <div className="cart-container">
        <div className="cart">
          <Components.CartIcon />
          <SwatchbookLinkContainer />
        </div>
        <div className="cart-alert">
          <Components.CartPanel />
        </div>
      </div>
    );
  }

  renderMainDropdown() {
    return (
      <Components.MainDropdown />
    );
  }

  renderHamburgerButton() {
    return (
      <div className="showmenu"><Components.Button icon="bars" onClick={this.toggleNavbarVisibility} /></div>
    );
  }

  // Customization - Replaced tagNav with custom main menu
  handleMenuItemClick = (e, path) => {
    e.preventDefault();
    ReactionRouter.go(path);
  };
  renderTagNav() {
    const { mainMenu } = this.state;
    return (
      <MainMenu mainMenu={mainMenu} onMenuItemClick={this.handleMenuItemClick} />
    );
  }

  render() {
    // Customizations:
    //- split cart container into separate line + include header feature line
    //- Added SwatchbookContainer
    const { featureLine } = this.state;
    return (
<div>
<fragment>

<nav>
<div className="tier-one nav_class">
  <ul className="nav_class_ul">
    <img src="https://uploads-ssl.webflow.com/5bb3c7462318764598407e29/5c3798309fb97b00fc2bc19c_hamburger.png" className="hamburger-holder nav-icon" />
    <ul>
      <div className="dropdown-tabs">
        <div className="dropdown-menu-columns">
          <div className="dropdown-menu-column center-block">
            <span className="dropdown-column-header big">What&quot;s New</span></div>
          <div className="dropdown-menu-column center-block"> </div>
          <div className="dropdown-menu-column center-block alt"> </div>

        </div>

        <div className="dropdown-menu-columns links-block">
          <div className="dropdown-menu-column center-block">
            <span className="dropdown-column-header">Winter 2019</span>
            <li className="red-s"><a href="/pages/hedonism1">Hedonism</a></li>
            <li><a href="/pages/lighten-up" className="lighten-up-link">Lighten Up</a></li>

          </div>

          <div className="dropdown-menu-column center-block"><span className="dropdown-column-header">Upcoming</span>
            <li className="unavailable">Unplug</li>



          </div>
          <div className="dropdown-menu-column center-block alt">

          </div>

        </div>
      </div>
    </ul>
    <li className="mainline">  {this.props.visibility.cartContainer && this.renderCartContainerAndPanel()}
    </li>
    <li className="mainline">   {this.props.visibility.notifications && this.renderNotificationIcon()}
    </li>
    <li className="mainline">{this.props.visibility.mainDropdown && this.renderMainDropdown()}
    </li>
  </ul>
</div>
</nav>

<nav>
<div className='mobile-nav nav_class'>
  <a href="/"><img className="logo-image-mobile" src="https://uploads-ssl.webflow.com/5bb3c7462318764598407e29/5c33a14f97720d5b469df301_flaneur-logo-text.png" /></a>
  <ul className="nav_class_ul">
  <li className="mainlinealt">

    <input type="checkbox" id="check" className="check-with-label" />
    <label for="check" className="label-for-check"><img src="https://uploads-ssl.webflow.com/5bb3c7462318764598407e29/5c3798309fb97b00fc2bc19c_hamburger.png" className="hamburger-holder nav-icon" /></label>

    <div id="mobile-nav-holder">

      <ul id="mobile-nav-holder">
        <div className="dropdown-tabs">

          <div className="mobile-nav-block">

            <div className="tab">
              <input id="tab-four" type="checkbox" name="tabs2" />
              <label for="tab-four">What&#39;s New</label>
              <div className="tab-content">

                <div className="dropdown-menu-columns links-block">
                  <div className="dropdown-menu-column center-block">
                    <span className="dropdown-column-header">Winter 2019</span>
                    <li className="red-s"><a href="/pages/hedonism1">Hedonism</a></li>
                    <li className="lighten-up-link"><a href="/pages/lighten-up">Lighten Up</a></li>

                  </div>

                  <div className="dropdown-menu-column center-block"><span className="dropdown-column-header">Upcoming</span>
                    <li className="unavailable">Unplug</li>



                  </div>
                  <div className="dropdown-menu-column center-block alt">

                  </div>
                </div>

              </div>
            </div>
            <div className="tab blue">
              <input id="tab-five" type="checkbox" name="tabs2" />
              <label for="tab-five">Find Your Color</label>
              <div className="tab-content">

                <div className="dropdown-menu-columns links-block">
                  <div className="dropdown-menu-column center-block">

                    <li><a href="/upload-an-image">Upload an Image</a></li>
                    <li><a href="/design-your-bedding" className="">Enter a Pantone Code</a></li>
                    <li><a href="/color-houses" className="two">Shop Curated Colors</a></li>
                  </div>

                  <div className="dropdown-menu-column center-block alt">

                  </div>

                </div>

              </div>
            </div>
            <div className="tab blue">
              <input id="tab-six" type="checkbox" name="tabs2" />
              <label for="tab-six">Shop the Look</label>
              <div className="tab-content">
                <div className="dropdown-menu-columns links-block">
                  <div className="dropdown-menu-column center-block">
                    <span className="dropdown-column-header">Capsules</span>
                    <li className="trigger-tim-clarke"><a href="/product/tim-clarke">Tim Clarke</a></li>
                    <li className="trigger-bennett-leifer"><a href="/product/bennett-leifer">Bennett Leifer</a></li>
                    <li className="trigger-sasha-bikoff"><a href="/product/sasha-bikoff">Sasha Bikoff</a></li>
                    <li className="trigger-sophie-donelson"><a href="/product/sophie-donelson">Sophie Donelson</a></li>
                    <li className="trigger-estee-stanley"><a href="/product/estee-stanley-bohemian-look">Bohemian Look (Estee Stanley)</a></li>
                    <li className="trigger-estee-stanley"><a href="/product/estee-stanley-masculine-look">Grayscale Look (Estee Stanley)</a></li>
                    <li className="trigger-estee-stanley"><a href="/product/estee-stanley-modern-look">Modern Look (Estee Stanley)</a></li>
                  </div>

                  <div className="dropdown-menu-column center-block">



                  </div>
                  <div className="dropdown-menu-column center-block alt">

                  </div>
                </div>
              </div>
            </div>
            <div className="tab blue">
              <input id="tab-eight" type="checkbox" name="tabs2" />
              <label for="tab-eight">Color Study</label>
              <div className="tab-content">
                <div className="dropdown-menu-columns links-block">
                  <div className="dropdown-menu-column center-block">
                    <span className="dropdown-column-header">Color Study</span>
                    <li className="trigger-color-study-1"><a href="/pages/color-study">Color Study 1-3</a></li>

                  </div>

                  <div className="dropdown-menu-column center-block">


                  </div>
                  <div className="dropdown-menu-column center-block alt">

                  </div>
                </div>
              </div>
            </div>
            <div className="tab blue">
              <input id="tab-seven" type="checkbox" name="tabs2" />
              <label for="tab-seven">World of Flaneur</label>
              <div className="tab-content">

                <div className="dropdown-tabs">


                  <div className="dropdown-menu-columns links-block">
                    <div className="dropdown-menu-column center-block">
                      <span className="dropdown-column-header">About the Bedding</span>
                      <li className="red"><a href="/pages/faqs">FAQs</a></li>
                      <li><a href="/supply-chain" className="two">Bed to Bud</a></li>
                      <li><a href="/pages/using-color" className="two">Color Tips</a></li>
                    </div>

                    <div className="dropdown-menu-column center-block"><span className="dropdown-column-header">About the Company</span>
                      <li><a href="/about-us" className="two">Founding</a></li>
                      <li><a href="/about-us" className="two">Our Philosophy</a></li>
                      <span className="dropdown-column-header">Press</span>
                      <li><a href="/pages/press" className="two">Recent Coverage</a></li>


                    </div>
                    <div className="dropdown-menu-column center-block alt">

                    </div>

                  </div>
                </div>

              </div>
            </div>
            <div className="tab blue">
                <label for="tab-nine"><a href="http://salon.hiflaneur.com" className="link-mobile-nav-no-tab"><i>The Salon</i></a></label>

            </div>




          </div>
        </div>
      </ul>
    </div>
  </li>


    <li className="mainline">   {this.props.visibility.cartContainer && this.renderCartContainerAndPanel()}
    </li>
    <li className="mainline">  {this.props.visibility.notifications && this.renderNotificationIcon()}
    </li>
    <li className="mainline">{this.props.visibility.mainDropdown && this.renderMainDropdown()}
    </li>
    </ul>
    </div>
</nav>

<nav>
<div className='desktop-nav nav_class'>
  <ul className="nav_class_ul">
    <li className="mainline logo-img"><a href="/"><img className="logo-image" src="https://uploads-ssl.webflow.com/5bb3c7462318764598407e29/5c33a14f97720d5b469df301_flaneur-logo-text.png"  /></a></li>

    <li className="mainline"><a href="#">What&#39;s New</a>
      <ul>
        <div className="dropdown-tabs">
          <div className="dropdown-menu-columns">
            <div className="dropdown-menu-column center-block">
              <span className="dropdown-column-header big">What&quot;s New</span></div>
            <div className="dropdown-menu-column center-block"> </div>
            <div className="dropdown-menu-column center-block alt"> </div>

          </div>

          <div className="dropdown-menu-columns links-block">
            <div className="dropdown-menu-column center-block">
            <span className="dropdown-column-header">Winter 2019</span>
            <li className="red-s"><a href="/pages/hedonism1">Hedonism</a></li>
      <li className="lighten-up-link"><a href="/pages/lighten-up">Lighten Up</a></li>
            </div>

            <div className="dropdown-menu-column center-block"><span className="dropdown-column-header">Upcoming</span>
              <li className="unavailable">Unplug</li>



            </div>
            <div className="dropdown-menu-column center-block alt">

            </div>

          </div>
        </div>
      </ul>
    </li>

    <li className="mainline"><a href="#">Find Your Color</a>
      <ul>
        <div className="dropdown-tabs">
          <div className="dropdown-menu-columns">
            <div className="dropdown-menu-column center-block">
              <span className="dropdown-column-header big">Find Your Color</span></div>
            <div className="dropdown-menu-column center-block alt"> </div>

          </div>

          <div className="dropdown-menu-columns links-block">
            <div className="dropdown-menu-column center-block">


                                    <li><a href="/upload-an-image">Upload an Image</a></li>
                                    <li><a href="/design-your-bedding" className="">Enter a Pantone Code</a></li>
                                    <li><a href="/color-houses" className="two">Shop Curated Colors</a></li>
            </div>

            <div className="dropdown-menu-column center-block alt">

            </div>

          </div>
        </div>
      </ul>
    </li>
    <li className="mainline"><a href="#">Shop the Look</a>
      <ul>
        <div className="dropdown-tabs">
          <div className="dropdown-menu-columns">
            <div className="dropdown-menu-column center-block">
              <span className="dropdown-column-header big">Shop the Look</span></div>
            <div className="dropdown-menu-column center-block"> </div>
            <div className="dropdown-menu-column center-block alt"> </div>
          </div>
          <div className="dropdown-menu-columns links-block">
            <div className="dropdown-menu-column center-block">

            <li className="trigger-tim-clarke"><a href="/product/tim-clarke">Tim Clarke</a></li>
            <li className="trigger-bennett-leifer"><a href="/product/bennett-leifer">Bennett Leifer</a></li>
            <li className="trigger-sasha-bikoff"><a href="/product/sasha-bikoff">Sasha Bikoff</a></li>
            <li className="trigger-sophie-donelson"><a href="/product/sophie-donelson">Sophie Donelson</a></li>
            <li className="trigger-estee-stanley"><a href="/product/estee-stanley-bohemian-look">Bohemian Look (Estee Stanley)</a></li>
            <li className="trigger-estee-stanley"><a href="/product/estee-stanley-masculine-look">Grayscale Look (Estee Stanley)</a></li>
            <li className="trigger-estee-stanley"><a href="/product/estee-stanley-modern-look">Modern Look (Estee Stanley)</a></li>
          </div>
            <div className="dropdown-menu-column center-block">

            </div>
            <div className="dropdown-menu-column center-block alt">

            </div>

          </div>
        </div>
      </ul>
    </li>
    <li className="mainline"><a href="#">Color Study</a>
      <ul>
        <div className="dropdown-tabs">
          <div className="dropdown-menu-columns">
            <div className="dropdown-menu-column center-block">
              <span className="dropdown-column-header big">Color Study</span></div>
            <div className="dropdown-menu-column center-block"> </div>
            <div className="dropdown-menu-column center-block alt"> </div>

          </div>

          <div className="dropdown-menu-columns links-block">
            <div className="dropdown-menu-column center-block">

            <li className="trigger-color-study-1"><a href="#">Color Studies 1-3</a></li>

          </div>


            <div className="dropdown-menu-column center-block alt">

            </div>

          </div>
        </div>
      </ul>
    </li>

    <li className="mainline"><a href="#">World of Flaneur</a>
      <ul>
        <div className="dropdown-tabs">
          <div className="dropdown-menu-columns">
            <div className="dropdown-menu-column center-block">
              <span className="dropdown-column-header big">World of Flaneur</span></div>
            <div className="dropdown-menu-column center-block"> </div>
            <div className="dropdown-menu-column center-block alt"> </div>

          </div>

          <div className="dropdown-menu-columns links-block">
            <div className="dropdown-menu-column center-block">
            <span className="dropdown-column-header">About the Bedding</span>
            <li className="red"><a href="/pages/faqs">FAQs</a></li>
            <li><a href="/supply-chain" className="two">Bed to Bud</a></li>
            <li><a href="/pages/using-color" className="two">Color Tips</a></li>
            </div>

            <div className="dropdown-menu-column center-block"><span className="dropdown-column-header">About the Company</span>
            <li><a href="/about-us" className="two">Founding</a></li>
            <li><a href="/about-us" className="two">Our Philosophy</a></li>
            <span className="dropdown-column-header">Press</span>
            <li><a href="/pages/press" className="two">Recent Coverage</a></li>


            </div>
            <div className="dropdown-menu-column center-block alt">

            </div>

          </div>
        </div>
      </ul>
    </li>
    <li className="mainline"><a href="http://salon.hiflaneur.com"><i>The Salon</i></a></li>
  </ul>
</div>
</nav>
</fragment>

  <SwatchbookContainer />
</div>


    );
  }
}

export default NavBar;
