import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { initImageColorPicker } from '../lib/ImageColorPicker';
import IndexView from './IndexView';
import HaveView from './HaveView';
import EnterPantoneView from './EnterPantoneView';
import UploadImageView from './UploadImageView';
import PickImageColorView from './PickImageColorView';
import HelpView from './HelpView';

export default class BeddingBuilder extends Component {

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
    onColorTipsClick: PropTypes.func.isRequired,
    onCapsulesClick: PropTypes.func.isRequired,
    onImageChange: PropTypes.func.isRequired,
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
        {view === 'index' && <IndexView {...this.props} />}
        {view === 'have' && <HaveView {...this.props} />}
        {view === 'enterPantone' && <EnterPantoneView {...this.props} />}
        {view === 'uploadImage' && <UploadImageView {...this.props} />}
        {view === 'pickImageColor' && <PickImageColorView {...this.props} />}
        {view === 'help' && <HelpView {...this.props} />}
      </div>
    )
  }
}
