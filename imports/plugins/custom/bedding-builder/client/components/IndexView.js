import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColorHousesOption from './ColorHousesOption';

export default class IndexView extends Component {

  static propTypes = {
    onHaveClick: PropTypes.func.isRequired,
    onHelpClick: PropTypes.func.isRequired
  }

  render () {
    const { onHaveClick, onHelpClick } = this.props;

    return (
      <div className="view">
        <div className="bedding-builder-section">
          <div className="progressbarrow w-row">
            <div className="progress-bar w-col w-col-3 w-col-medium-3 w-col-small-3 w-col-tiny-3">
              <div className="progress-bar-div current"></div>
            </div>
            <div className="progress-bar w-col w-col-3 w-col-medium-3 w-col-small-3 w-col-tiny-3">
              <div className="progress-bar-div current"></div>
            </div>
            <div className="progress-bar w-col w-col-3 w-col-medium-3 w-col-small-3 w-col-tiny-3">
              <div className="progress-bar-div"></div>
            </div>
            <div className="progress-bar w-col w-col-2 w-col-medium-2 w-col-small-2 w-col-tiny-2">
              <div className="progress-bar-div"></div>
            </div>
            <div className="progress-bar w-col w-col-1 w-col-medium-1 w-col-small-1 w-col-tiny-1">
              <div className="progress-bar-div"></div>
            </div>
          </div>
          <div className="div-block-39">
            <div className="div-block-9">
              <div className="div-block-17-no-tooltip">
                <h1 className="heading-3-no-tooltip-2">Find your custom-colored bedding.</h1>
              </div>
              <div className="div-block-19">
                <div className="text-block-15">Select one.</div>
              </div>
            </div>
            <div className="bedding-container-whole w-container">
              <div className="bedding-builder-holder">
                <div className="row-bedding w-row">
                  <div className="bedding-builder-3-column w-col w-col-1 w-col-stack"></div>
                  <div className="bedding-builder-3-column w-col w-col-3 w-col-stack">
                    <div className="bedding-builder-containerblock"><a href="/color-houses"><img src="/images/Oval-21.png" width="259" className="bedding-oval-shape" /></a>
                      <div className="bedding-build-1-line"><a href="/color-houses" className="bedding-link">View Color Houses</a>
                        <div className="tooltip"><img src="/images/question-mark-1question-mark.png" width="19" className="question-centered" /><span className="tooltiptext">Sophisticated colors curated by Flaneur color experts.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bedding-builder-3-column w-col w-col-4 w-col-stack">
                    <div className="bedding-builder-containerblock"><a href="/pages/capsule"><img src="/images/Oval-23.png" width="259" className="bedding-oval-shape" /></a>
                      <div className="bedding-build-1-line option enter-pantone"><a href="/pages/capsule" className="bedding-link">Shop the Look</a>
                        <div className="tooltip"><img src="/images/question-mark-1question-mark.png" width="19" className="question-centered" /><span className="tooltiptext">Color palettes designed by A-list interior designers.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bedding-builder-3-column w-col w-col-3 w-col-stack">
                    <div className="bedding-builder-containerblock"><img onClick={onHaveClick} src="/images/Oval-21.png" width="259" className="bedding-oval-shape" />
                      <div className="bedding-build-1-line option upload-image"><a href="#" onClick={onHaveClick} className="bedding-link">Create Your Shade</a>
                        <div className="tooltip"><img src="/images/question-mark-1question-mark.png" width="19" className="question-centered" /><span className="tooltiptext">Send us a Pantone color code or upload an image to specify.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bedding-builder-3-column w-col w-col-1 w-col-stack"></div>
                </div>

              </div>
            </div>
          </div>
          <div className="help-block w-container">
            <div className="row-28 w-row">
              <div className="column-22 w-col w-col-4">

              </div>
              <div className="column-22 w-col w-col-4">  <div>
                  <h1 className="heading-7">Can we help you?</h1>
                  <p className="paragraph-3">Our concierge is available to assist you with color selections and more. </p><a href="#" onClick={()=>{ Intercom('show'); }} className="side-button">Chat</a></div>
              </div>
              <div className="column-22 w-col w-col-4">

              </div>
            </div>
          </div>

        </div>


      </div>




    );
  }
}
