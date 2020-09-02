import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackLink from './BackLink';
import ColorHousesOption from './ColorHousesOption';

export default class HelpView extends Component {

  static propTypes = {
    onColorTipsClick: PropTypes.func.isRequired,
    onCapsulesClick: PropTypes.func.isRequired
  }

  render () {
    const { onColorTipsClick, onCapsulesClick } = this.props;

    return (
      <div className="view">
      <div className="bedding-builder-section">
    <div className="progressbarrow w-row">
      <div className="progress-bar w-col w-col-3 w-col-medium-3 w-col-small-3 w-col-tiny-3">
        <div className="progress-bar-div current"></div>
      </div>
      <div className="progress-bar w-col w-col-3 w-col-medium-3 w-col-small-3 w-col-tiny-3">
        <div className="progress-bar-div"></div>
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
    <div className="link-back">
      <BackLink {...this.props} />
    </div>
    <div className="div-block-39">
      <div className="div-block-9">
        <div className="div-block-17-no-tooltip">
          <h1 className="heading-3-no-tooltip-2">I need inspiration.</h1>
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
              <div className="bedding-builder-containerblock"><img src="/images/Oval-21.png" width="259" className="bedding-oval-shape"/>
                <div className="bedding-build-1-line option color-tips"><a href="/pages/using-color" className="bedding-link">Using Color Guide</a><div className="tooltip"><img src="/images/question-mark-1question-mark.png" width="19" className="question-centered"/><span className="tooltiptext">Get acquainted with these practical color ideas.</span>
</div></div>
              </div>
            </div>
            <div className="bedding-builder-3-column w-col w-col-4 w-col-stack">
              <div className="bedding-builder-containerblock"><img src="/images/Oval-21.png" width="259" className="bedding-oval-shape"/>
                <div className="bedding-build-1-line option capsules"><a href="/pages/capsule" className="bedding-link">See Designer Capsules</a><div className="tooltip"><img src="/images/question-mark-1question-mark.png" width="19" className="question-centered"/><span className="tooltiptext">Collaborations with top interior designers.</span>
</div></div>
              </div>
            </div>
            <div className="bedding-builder-3-column w-col w-col-3 w-col-stack">
              <div className="bedding-builder-containerblock"><img src="/images/Oval-21.png" width="259" className="bedding-oval-shape"/>
                <div className="bedding-build-1-line"><a href="/color-houses" className="bedding-link">See Color Houses</a><div className="tooltip"><img src="/images/question-mark-1question-mark.png" width="19" className="question-centered"/><span className="tooltiptext">View curated collections of colors by Flaneurs experts.</span>
</div></div>
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
