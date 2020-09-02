import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { initImageColorPicker } from '../lib/ImageColorPicker';
import IndexView from './IndexView';
import HaveView from './HaveView';
import EnterPantoneView from './EnterPantoneView';
import UploadImageView from './UploadImageView';
import UploadImageViewSolo from './UploadImageViewSolo';
import PickImageColorView from './PickImageColorView';
import PickImageColorV2View from './PickImageColorV2View';
import HelpView from './HelpView';

export default class uploadAnImage extends Component {

  static propTypes = {
    view: PropTypes.string.isRequired,
    image: PropTypes.string,
    imageColors: PropTypes.array,
    pantoneCode: PropTypes.string,
    onHaveClick: PropTypes.func.isRequired,
    onHelpClick: PropTypes.func.isRequired,
    onUploadClick: PropTypes.func.isRequired,
    onEnterPantoneClick: PropTypes.func.isRequired,
    onColorHousesClick: PropTypes.func.isRequired,
    onBackClick: PropTypes.func.isRequired,
    onBackToHaveClick: PropTypes.func.isRequired,
    onBackToUploadClick: PropTypes.func.isRequired,
    onBackToUploadV2Click: PropTypes.func.isRequired,
    onColorTipsClick: PropTypes.func.isRequired,
    onCapsulesClick: PropTypes.func.isRequired,
    onImageChange: PropTypes.func.isRequired,
    onImageChangeV2: PropTypes.func.isRequired,
    onReplaceImageClick: PropTypes.func.isRequired,
    onColorPick: PropTypes.func.isRequired,
    onPantoneCodeChange: PropTypes.func.isRequired,
    onPantoneCodeFormSubmit: PropTypes.func.isRequired
  };

  componentDidUpdate (prevProps) {
    const { view, onColorPick } = this.props;
    if (view === 'pickImageColor' && prevProps.view !== 'pickImageColor') {
      initImageColorPicker('#picker-image', '#image-canvas', onColorPick);
    }
  }

  render () {
    const { view } = this.props;
    return (
      <div id="bedding-builder-container">
        {view === 'index' && <UploadImageViewSolo {...this.props} />}
        {view === 'have' && <HaveView {...this.props} />}
        {view === 'enterPantone' && <EnterPantoneView {...this.props} />}
        {view === 'uploadImage' && <UploadImageViewSolo {...this.props} />}
        {view === 'pickImageColor' && <PickImageColorV2View {...this.props} />}
        {view === 'help' && <HelpView {...this.props} />}
      </div>
    )
  }
}
