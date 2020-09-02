import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ImageUploadField from '/imports/plugins/custom/flaneur/client/components/ImageUploadField';
import Autocomplete from '/imports/plugins/custom/flaneur/client/components/Autocomplete';
import Loadable from 'react-loadable';
const ContentEditor = Loadable({
  loader: async () => {
    const component = await import('/imports/plugins/custom/flaneur/client/components/ContentEditor');
    return component.default;
  },
  loading: () => null
});
const SortableColorList = Loadable({
  loader: async () => {
    const component = await import ('./SortableColorList');
    return component.default;
  },
  loading: () => null
});

export default class RecommendsForm extends Component {

  static propTypes = {
    // Values for form fields, keyed by name
    formFields: PropTypes.object.isRequired,
    // Options for color autocomplete
    colorOptions: PropTypes.array.isRequired,
    colors: PropTypes.array.isRequired,
    isAutocompleteLoading: PropTypes.bool.isRequired,
    // onInputChange: PropTypes.func.isRequired,
    onDescriptionChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    // onImageUpload: PropTypes.func.isRequired,
    // onImageRemove: PropTypes.func.isRequired,
    onColorSearch: PropTypes.func.isRequired,
    onColorAdd: PropTypes.func.isRequired,
    onColorRemove: PropTypes.func.isRequired,
    onSortEnd: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
  }

  render () {
    const {
      formFields,
      colorOptions,
      isAutocompleteLoading,
      colors,
      // onInputChange,
      onDescriptionChange,
      onSave,
      onBack,
      // onImageUpload,
      // onImageRemove,
      onColorSearch,
      onColorAdd,
      onColorRemove,
      onSortEnd
    } = this.props;
    const {
      // title,
      description,
      // imageFileId,
      // imageFileName
    } = formFields;

    return (
      <div>
        <div className="form-group">
          <button className="btn btn-default" onClick={onBack}>Back</button>
        </div>        
        <div className="form-group">
          <label>Description</label>
          <ContentEditor value={description} onChange={onDescriptionChange} />
        </div>        
        <div className="form-group">
          <label>Color</label>
          <SortableColorList
            items={colors}
            onSortEnd={onSortEnd}
            useDragHandle={true}
            onColorRemove={onColorRemove}
          />
          {
            colors.length === 0 && 
            <Autocomplete
              labelKey="name"
              placeholder="Enter a color name to add..."
              options={colorOptions}
              isLoading={isAutocompleteLoading}
              onSearch={onColorSearch}
              onEnter={onColorAdd}
            />
          }
        </div>
        <button className="btn btn-default" onClick={onSave}>Save</button>
      </div>
    )
  }
}
