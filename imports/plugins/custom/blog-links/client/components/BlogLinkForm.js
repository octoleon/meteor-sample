import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ImageUploadField from '/imports/plugins/custom/flaneur/client/components/ImageUploadField';
import Loadable from 'react-loadable';
const ContentEditor = Loadable({
  loader: async () => {
    const component = await import('/imports/plugins/custom/flaneur/client/components/ContentEditor');
    return component.default;
  },
  loading: () => null
});

export default class BlogLinkForm extends Component {

  static propTypes = {
    // Values for form fields, keyed by name
    formFields: PropTypes.object.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onDescriptionChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    onImageUpload: PropTypes.func.isRequired,
    onImageRemove: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
  }

  render () {
    const {
      formFields,
      onInputChange,
      onDescriptionChange,
      onSave,
      onBack,
      onImageUpload,
      onImageRemove
    } = this.props;
    const {
      title,
      imageFileId,
      imageFileName,
      description,
      url
    } = formFields;

    return (
      <div>
        <div className="form-group">
          <button className="btn btn-default" onClick={onBack}>Back</button>
        </div>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={title}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <ContentEditor value={description} onChange={onDescriptionChange} />
        </div>
        <ImageUploadField
          label="Image"
          fileId={imageFileId}
          fileName={imageFileName}
          onChange={onImageUpload}
          onRemove={onImageRemove}
        />
        <div className="form-group">
          <label>URL</label>
          <input
            type="text"
            className="form-control"
            name="url"
            value={url}
            placeholder="https://"
            onChange={onInputChange}
          />
        </div>
        <button className="btn btn-default" onClick={onSave}>Save</button>
      </div>
    )
  }
}
