import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackLink from './BackLink';
import ScrollableAnchor from 'react-scrollable-anchor';

export default class UploadImageViewSolo extends Component {

  static propTypes = {
    onImageChange: PropTypes.func.isRequired,
  }

  render () {
    const { onImageChange } = this.props;

    return (
      <div className="view">

        <div className="color-section">

          <div className="div-block-39">
            <div className="container-2 w-container">
              <div>
              <div className="div-block-17 w-clearfix">
                <h1 className="heading-3-no-tooltip-2 alt-heading">Customize The Color Of Your Luxury Bedding</h1>

              </div>
              <div className="div-block-19">
                <div className="text-block-15 alt-block">You’ve been looking for luxurious bedding in a particular color forever. Let Flaneur help put an end to your search.

Flaneur’s custom color service enables you to order any color you want from a picture. And your beddings are dyed-to-order and delivered in just 14 days.</div>
              </div>

<div className="w-row how-to-work">
                <div className="w-col w-col-4 div-block-17 w-clearfix">
                  <h1 className="heading-3-no-tooltip-2 alt-heading upload-specific">Upload an Image</h1>

                  <div className="div-block-19">
                    <div className="text-block-15">You can refine it on the next page.</div>
                  </div>
                </div>
                <div className="w-col w-col-8 div-block-9co">
                  <div className="div-block-15">
                    <div className="image-uploader">

                      <input type="file" name="file" id="file" className="inputfile" onChange={onImageChange}/>
              <label className="input-upload" for="file"> Choose a file</label>
                    </div>
                  </div>
                  <div>
                </div>
                  </div>
              </div>

              <div>

                </div>
              </div>

                <div className="w-col w-col-1"></div>
                <div className="w-col w-col-10">

                </div>
                <div className="w-col w-col-1"></div>
                <div className="w-row">
                <div className="div-block-17 w-clearfix">
                    <h1 className="heading-3-no-tooltip-2 alt-heading how-to-work">How it works</h1>

                  </div>
                  <div className="homepage_links_column w-col w-col-4">

                    <div className="homepage_links_individual_div alt-view">
                    <center><p className="link_homepage_link">Step 1.</p></center>
                      <p className="paragraph_link_homepage">Upload an image containing the color you want. <br /> Tip: Artwork, draperies or headboard are good starting points.</p>

                    </div>
                  </div>
                  <div className="homepage_links_column w-col w-col-4">

                    <div className="homepage_links_individual_div alt-view">
                    <center><p className="link_homepage_link">Step 2.</p></center>
                      <p className="paragraph_link_homepage">Move the circles on the image to locate your color. Click on the color circle to learn more about specs, sizes, and craftsmanship details. You can complete the purchase there. </p>

                    </div>
                  </div>
                  <div className="homepage_links_column w-col w-col-4">

                    <div className="homepage_links_individual_div alt-view">
                    <center><p className="link_homepage_link">Step 3.</p></center>
                      <p className="paragraph_link_homepage">The beddings will be dyed-to-order and pre-washed at our facility in Los Angeles. We will deliver them to your door in 14 days. Enjoy.
                </p>

                    </div>
              </div>

                </div>
              </div>
            </div>
          </div>

        </div>





    );
  }
}
