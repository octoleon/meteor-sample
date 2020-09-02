import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import BeddingBuilder from '../components/BeddingBuilder';
import { setMeta } from '/imports/plugins/custom/flaneur/client/lib/seo';
import { hexToPantone } from '../lib/hexToPantone';
import ReactGA from 'react-ga';

export default class BeddingBuilderContainer extends Component {

  state = {
    view: 'index', // or 'have', 'help', 'uploadImage', 'pickImageColor', 'enterPantone'
    image: '', // User uploaded image, for color picker    
    imageColors: [], // Closest Pantone colors when color is picked from image
    pantoneCode: '' // User-entered Pantone code
  };

  isAlreadyVisitedUser () {
    Meteor.call('IsDesignYourBeddingPageVisitedUser', Meteor.userId(), (err, isVisitedUser) => {
      if (err) {
        alert(err.reason);
      } else {
        if (!isVisitedUser) {
          this.sendEmailOfVisitingDesignYourBeddingPage();
        }
      }
    });
  }

  sendEmailOfVisitingDesignYourBeddingPage () {
    Meteor.call('Visit.DesignYourBeddingPage', Meteor.userId(), err => {
      if (err) {
        alert(err.reason);
      } else {
        Alerts.toast('Visiting specific page email sent');
      }
    });
  }

  componentWillMount () {
    ReactGA.pageview('/design-your-bedding');

    var d = new Date();
    const temp_img_saved_time = this.getLocalStorage('bedding-builder-temp-image-time', 0);
    if (temp_img_saved_time) {
      if (d.getHours()*3600 + d.getMinutes()*60 + d.getSeconds() - temp_img_saved_time > 120) { // if saved temp image's time is later than 10s
        // Reset temp image & colors on local storage
        this.setLocalStorage('bedding-builder-temp-image', '');
        this.setLocalStorage('bedding-builder-temp-colors', '');
        // Reset time for temp image
        this.setLocalStorage('bedding-builder-temp-image-time', 0);
      } else {
        const temp_img = this.getLocalStorage('bedding-builder-temp-image', '');
        if (temp_img) {
          this.setState({
            image: temp_img,
            view: 'pickImageColor'
          });
        }
      }
    }
  }

  componentDidMount () {
    setMeta('Bedding Builder');
    window.prerenderReady = true;

    this.isAlreadyVisitedUser();
  }

  handleHaveClick = () => {
    this.setState({ view: 'have' });
  };

  handleHelpClick = () => {
    this.setState({ view: 'help' });
  };

  handleUploadClick = () => {
    this.setState({ view: 'uploadImage' });
  };

  handleBackToHaveClick = () => {
    this.setState({ view: 'have' });
  };

  handleBackToUploadClick = () => {
    // Reset temp image & colors on local storage
    this.setLocalStorage('bedding-builder-temp-image', '');
    this.setLocalStorage('bedding-builder-temp-colors', '');
    // Reset time for temp image
    this.setLocalStorage('bedding-builder-temp-image-time', 0);

    this.setState({ view: 'uploadImage' });
  };

  handleEnterPantoneClick = () => {
    this.setState({ view: 'enterPantone' });
  };

  handleColorHousesClick = () => {
    ReactionRouter.go('/color-houses');
  };

  handleBackClick = () => {
    this.setState({ view: 'index' });
  };

  handleColorTipsClick = () => {
    alert('TBD');
  };

  handleCapsulesClick = () => {
    alert('TBD, go to first Capsule PDP by alphabetical order?');
  };

  getLocalStorage = (key, defaultValue) => {
    var value = window.localStorage.getItem(key);

    var decoded = JSON.parse(value);

    if (decoded) {
        return decoded;
    }

    return defaultValue;
  }

  setLocalStorage = (key, value) => {
    window.localStorage.setItem(
      key, JSON.stringify(value)
    );
  }

  handleImageChange = e => {
    const files = e.target.files;
    if (files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.setState({
          image: reader.result,
          view: 'pickImageColor'
        });

        // Store image temporarily to local storage
        this.setLocalStorage('bedding-builder-temp-image', reader.result);
        this.setLocalStorage('bedding-builder-temp-colors', '');

        // Current Time for temp image
        var d = new Date();
        this.setLocalStorage('bedding-builder-temp-image-time', d.getHours()*3600 + d.getMinutes()*60 + d.getSeconds());
      };
      reader.readAsDataURL(file);
    }
  };

  handleReplaceImageClick = e => {
    this.setLocalStorage('bedding-builder-temp-image', '');
    this.setLocalStorage('bedding-builder-temp-colors', '');
    this.setLocalStorage('bedding-builder-temp-image-time', 0);

    this.setState({
      image: '',
      view: 'uploadImage',
      imageColors: []
    }, () => {
      $('.image-uploader input').click();
    });
  };

  handleColorPick = hexCode => {    
    const matches = new hexToPantone(hexCode, 3);
    const pantoneCodes = matches.map(match => `${match} TCX`);
    Meteor.call('Colors.getByPantoneCodes', pantoneCodes, (err, imageColors) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ imageColors });
      }
    });
  };

  handlePantoneCodeChange = e => {
    this.setState({ pantoneCode: e.target.value });
  };

  handlePantoneCodeFormSubmit = e => {
    e.preventDefault();
    const { pantoneCode } = this.state;
    if (!pantoneCode) {
      return alert('Enter a Pantone code to continue.');
    }
    Meteor.call('Colors.getByPantoneCodes', [this.state.pantoneCode], (err, colors) => {
      if (err) {
        alert(err.reason);
      } else if (!colors[0]) {
        alert(`We were unable find a Pantone with the code: ${this.state.pantoneCode}`);
      } else {
        ReactionRouter.go(colors[0].pdpURL);
      }
    });
  };

  render () {
    const { view, image, imageColors, pickImageColor, pantoneCode } = this.state;

    return (
      <BeddingBuilder
        view={view}
        image={image}
        imageColors={imageColors}
        pickImageColor={pickImageColor}
        onHaveClick={this.handleHaveClick}
        onHelpClick={this.handleHelpClick}
        onUploadClick={this.handleUploadClick}
        onEnterPantoneClick={this.handleEnterPantoneClick}
        onColorHousesClick={this.handleColorHousesClick}
        onBackClick={this.handleBackClick}
        onBackToHaveClick={this.handleBackToHaveClick}
        onColorTipsClick={this.handleColorTipsClick}
        onBackToUploadClick={this.handleBackToUploadClick}
        onCapsulesClick={this.handleCapsulesClick}
        onImageChange={this.handleImageChange}
        onReplaceImageClick={this.handleReplaceImageClick}
        onColorPick={this.handleColorPick}
        pantoneCode={pantoneCode}
        onPantoneCodeChange={this.handlePantoneCodeChange}
        onPantoneCodeFormSubmit={this.handlePantoneCodeFormSubmit}
      />
    );
  }
}
