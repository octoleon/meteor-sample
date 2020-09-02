import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ImageUploadField from '../components/ImageUploadField';

export default class ManageHomepageBannerContainer extends Component {

  constructor (props) {
    super(props);

    this.state = {
      imageFileId: '',
      imageFileName: '',
      title: '',
      buttonText: '',
      linkUrl: ''
    };
  }

  componentDidMount () {
    Meteor.call('Flaneur.getHomepageBanner', (err, state) => {
      this.setState(state);
    });
  }

  handleUpdateHomepageBanner = e => {
    e.preventDefault();
    Meteor.call('Flaneur.updateHomepageBanner', this.state, (err) => {
      if (err) {
        alert(err.reason);
      } else {
        alert('Your changes have been saved.');
      }
    });
  };

  handleImageUpload = (imageFileId, imageFileName) => {
    this.setState({ imageFileId, imageFileName });
  };

  handleImageRemove = () => {
    this.setState({ imageFileId: '', imageFileName: '' });
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render () {
    const { imageFileId, imageFileName, title, buttonText, linkUrl } = this.state;
    return (
      <div id="manage-homepage-banner-container">
        <ImageUploadField
          label="Image"
          fileId={imageFileId}
          fileName={imageFileName}
          onChange={this.handleImageUpload}
          onRemove={this.handleImageRemove}
        />
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={title}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Button Text</label>
          <input
            type="text"
            className="form-control"
            name="buttonText"
            value={buttonText}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Link URL</label>
          <input
            type="text"
            className="form-control"
            name="linkUrl"
            value={linkUrl}
            onChange={this.handleInputChange}
          />
        </div>
        <button className="btn btn-default" onClick={this.handleUpdateHomepageBanner}>Save</button>
      </div>
    );
  }
}
