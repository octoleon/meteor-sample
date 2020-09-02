import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColorHousesOption from './ColorHousesOption';
import BackLink from './BackLink';

export default class HaveView extends Component {

  static propTypes = {
    onUploadClick: PropTypes.func.isRequired,
    onEnterPantoneClick: PropTypes.func.isRequired
  }

  render () {
    const { onUploadClick, onEnterPantoneClick } = this.props;

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
<div className="link-back">
  <BackLink {...this.props} />
</div>
<div className="div-block-39">
  <div className="div-block-9">
    <div className="div-block-17-no-tooltip">
      <h1 className="heading-3-no-tooltip-2">Create your shade.</h1>
    </div>
    <div className="div-block-19">
      <div className="text-block-15">Select one.</div>
    </div>
  </div>
  <div className="bedding-container-whole w-container">
    <div className="bedding-builder-holder">
      <div className="row-bedding w-row">
        <div className="bedding-builder-3-column w-col w-col-6">
          <div className="bedding-builder-containerblock"><img onClick={onUploadClick} src="/images/Oval-21.png" width="315" srcSet="/images/Oval-21-p-500.png 500w, /images/Oval-21.png 518w" sizes="(max-width: 479px) 300px, 315px" className="bedding-oval-shape-large"/>
            <div className="bedding-build-2-line option have-color" onClick={onUploadClick}><a href="#" className="bedding-link">Upload an Image</a><div className="tooltip"><img src="/images/question-mark-1question-mark.png" width="19" className="question-centered"/><span className="tooltiptext">Already have an image in mind? Upload and start with that.</span>
</div></div>
          </div>
        </div>
        <div className="bedding-builder-3-column w-col w-col-6">
          <div className="bedding-builder-containerblock"><img onClick={onEnterPantoneClick} src="/images/Oval-21.png" width="315" srcSet="/images/Oval-21-p-500.png 500w, /images/Oval-21.png 518w" sizes="(max-width: 479px) 300px, 315px" className="bedding-oval-shape-large"/>
            <div className="bedding-build-2-line option need-help" onClick={onEnterPantoneClick}><a href="#" className="bedding-link">Enter Pantone Code</a><div className="tooltip"><img src="/images/question-mark-1question-mark.png" width="19" className="question-centered"/><span className="tooltiptext">The standard has already been set. Add the Pantone number here.</span>
</div></div>
          </div>
        </div>
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
