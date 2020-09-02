import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ImageUploadField from '../components/ImageUploadField';
import Loadable from 'react-loadable';
const ContentEditor = Loadable({
  loader: async () => {
    const component = await import('/imports/plugins/custom/flaneur/client/components/ContentEditor');
    return component.default;
  },
  loading: () => null
});

export default class ManageHomepageInfoContainer extends Component {

  constructor (props) {
    super(props);

    this.state = {
      imageFileId: '',
      imageFileName: '',
      title: '',
      description: '',
      buttonText: '',
      linkUrl: ''
    };
  }

  componentDidMount () {
    Meteor.call('Flaneur.getHomepageInfo', (err, state) => {
      this.setState(state);
    });
  }

  handleUpdateHomepageInfo = e => {
    e.preventDefault();
    Meteor.call('Flaneur.updateHomepageInfo', this.state, (err) => {
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

  handleDescriptionChange = description => {
    this.setState({ description });
  };

  render () {
    const { imageFileId, imageFileName, title, description, buttonText, linkUrl } = this.state;
    return (
      <div id="manage-homepage-info-container">
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
          <label>Description</label>
          <ContentEditor value={description} onChange={this.handleDescriptionChange} />
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
        <button className="btn btn-default" onClick={this.handleUpdateHomepageInfo}>Save</button>
      </div>
    );
  }
}
