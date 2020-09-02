import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
const ContentEditor = Loadable({
  loader: async () => {
    const component = await import('/imports/plugins/custom/flaneur/client/components/ContentEditor');
    return component.default;
  },
  loading: () => null
});

export default class PagesForm extends Component {

  static propTypes = {
    // Values for form fields, keyed by name
    formFields: PropTypes.object.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onBodyChange: PropTypes.func.isRequired,
    onPublishedChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
  }

  render () {
    const {
      formFields,
      onInputChange,
      onBodyChange,
      onPublishedChange,
      onSave,
      onBack
    } = this.props;
    const {
      title,
      body,
      path,
      description,
      isPublished
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
          <label>Body</label>
          <ContentEditor value={body} onChange={onBodyChange} />
        </div>
        <div className="form-group">
          <label>Path</label>
          <input
            type="text"
            className="form-control"
            name="path"
            value={path}
            placeholder="about-us"
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <label>SEO Description</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={description}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="checkbox"
            name="published"
            checked={isPublished}
            onChange={onPublishedChange}
            className="form-check-input"
          />
          <label className="form-check-label">&nbsp;&nbsp;Published?</label>
        </div>
        <button className="btn btn-default" onClick={onSave}>Save</button>
      </div>
    )
  }
}
