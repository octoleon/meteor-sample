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

export default class ColorForm extends Component {

  static propTypes = {
    // Values for form fields, keyed by name
    formFields: PropTypes.object.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onDescriptionChange: PropTypes.func.isRequired,
    onColorTagChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
  }

  render () {
    const {
      formFields,
      onInputChange,
      onDescriptionChange,
      onColorTagChange,
      onSave,
      onBack
    } = this.props;
    const {
      name,
      pantoneCode,
      hexCode,
      colorTag,
      description,
      slug
    } = formFields;

    return (
      <div>
        <div className="form-group">
          <button className="btn btn-default" onClick={onBack}>Back</button>
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <label>Color Tags</label>
          <ContentEditor value={colorTag} onChange={onColorTagChange} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <ContentEditor value={description} onChange={onDescriptionChange} />
        </div>
        <div className="form-group">
          <label>Pantone Code</label>
          <input
            type="text"
            className="form-control"
            name="pantoneCode"
            value={pantoneCode}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <label>HEX Code</label>
          <input
            type="text"
            className="form-control"
            name="hexCode"
            value={hexCode}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <label>Slug</label>
          <input
            type="text"
            className="form-control"
            name="slug"
            value={slug}
            onChange={onInputChange}
          />
        </div>
        <button className="btn btn-default" onClick={onSave}>Save</button>
      </div>
    )
  }
}
