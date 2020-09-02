import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabularTable from '/imports/plugins/custom/flaneur/client/components/TabularTable';
import { ColorHousesTable } from '../../lib/tables';
import ColorHouseForm from '../components/ColorHouseForm';
import { Session } from 'meteor/session';
import { Reaction, Logger } from "/client/api";
import { arrayMove } from '/imports/plugins/custom/flaneur/lib/helpers';
import { withTracker } from 'meteor/react-meteor-data';

class ManageColorHousesContainer extends Component {

  static propTypes = {
    editColorHouse: PropTypes.object,
    deleteColorHouseId: PropTypes.string
  };

  constructor (props) {
    super(props);

    this.newFormFields = {
      _id: '',
      title: '',
      description: '',
      colorHouseTag: '',
      imageFileId: '',
      imageFileName: '',
      colorIds: []
    };

    this.state = {
      view: 'list', // list, add, edit
      formFields: {},
      // Options for auto-complete
      colorOptions: [],
      isAutocompleteLoading: false,
      // Colors w/ name & _id fields
      colors: []
    };
  }

  componentDidUpdate (prevProps, prevState) {
    const isListView = this.state.view === 'list' && prevState.view !== 'list';
    const isAddView = this.state.view === 'add' && prevState.view !== 'add';
    const isEditView = this.state.view === 'edit' && prevState.view !== 'edit';
    if (isListView || isAddView) {
      // Clear autocomplete color options
      this.setState({ colorOptions: [], colors: [] });
    } else if (isEditView) {
      this.getHouseColors(this.state.formFields._id);
    }

    // Bring user to edit form when set
    const { editColorHouse } = this.props;
    const prevEditColorHouse = prevProps.editColorHouse;
    if (editColorHouse._id && (!prevEditColorHouse._id || prevEditColorHouse._id !== editColorHouse._id)) {
      this.setState({
        view: 'edit',
        formFields: editColorHouse
      });
    }

    // Handle color deletion
    const { deleteColorHouseId } = this.props;
    if (deleteColorHouseId) {
      this.handleDeleteColorHouse(deleteColorHouseId);
    }
  }

  handleDeleteColorHouse = _id => {
    Session.set('ColorHouses.deleteId', undefined);
    if (confirm('Are you sure you want to delete this color house?')) {
      Meteor.call('ColorHouses.delete', _id, (err) => {
        if (err) {
          alert(err.reason);
        } else {
          this.setState({
            view: 'list'
          });
        }
      })
    }
  };

  handleAddClick = e => {
    this.setState({
      view: 'add',
      formFields: { ... this.newFormFields }
    });
  };

  handleInputChange = e => {
    const { formFields } = this.state;
    formFields[e.target.name] = e.target.value;
    this.setState({ formFields });
  };

  handleDescriptionChange = description => {
    const { formFields } = this.state;
    formFields.description = description;
    this.setState({ formFields });
  };

  handleColorHouseTagChange = colorHouseTag => {
    const { formFields } = this.state;
    formFields.colorHouseTag = colorHouseTag;
    this.setState({ formFields });
  };

  handleNewColorHouseSave = e => {
    e.preventDefault();
    Meteor.call('ColorHouses.create', this.state.formFields, (err) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ view: 'list' });
      }
    });
  };

  handleEditColorHouseSave = e => {
    e.preventDefault();
    Meteor.call('ColorHouses.update', this.state.formFields, (err) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ view: 'list' });
        Session.set('ColorHouses.editColorHouse', undefined);
      }
    });
  };

  handleBack = e => {
    e.preventDefault();
    this.setState({ view: 'list' });
    Session.set('ColorHouses.editColorHouse', undefined);
  }

  handleImageUpload = (imageFileId, imageFileName) => {
    const { formFields } = this.state;
    formFields.imageFileId = imageFileId;
    formFields.imageFileName = imageFileName;
    this.setState({ formFields });
  };

  handleImageRemove = () => {
    const { formFields } = this.state;
    formFields.imageFileId = '';
    formFields.imageFileName = '';
    this.setState({ formFields });
  };

  getHouseColors = _id => {
    Meteor.call('ColorHouses.getHouseColors', _id, (err, colors) => {
      this.setState({ colors });
    });
  };

  handleColorSearch = query => {
    this.setState({ isAutocompleteLoading: true });
    Meteor.call('Colors.autocompleteSearch', query, (err, colorOptions) => {
      this.setState({
        colorOptions,
        isAutocompleteLoading: false
      });
    });
  };

  handleColorAdd = name => {
    const color = this.state.colorOptions.find(color => color.name === name);
    if (color) {
      const { formFields, colors } = this.state;
      const existingColor = colors.find(color => color.name === name);
      if (!existingColor) {
        formFields.colorIds.push(color._id);
        colors.push(color);
        this.setState({ formFields, colors });
      }
    }
  }

  handleColorRemove = color => {
    const { formFields, colors } = this.state;
    const colorIdsIndex = formFields.colorIds.indexOf(color._id);
    const colorsIndex = colors.findIndex(c => c.name === color.name);
    if (colorIdsIndex !== -1) {
      formFields.colorIds.splice(colorIdsIndex, 1);
      colors.splice(colorsIndex, 1);
      this.setState({ formFields, colors });
    }
  };

  handleSortEnd = ({oldIndex, newIndex}) => {
    let { formFields, colors } = this.state;
    formFields.colorIds = arrayMove(formFields.colorIds, oldIndex, newIndex);
    colors = arrayMove(colors, oldIndex, newIndex);
    this.setState({ formFields, colors });
  };

  render () {
    const { view, formFields, colorOptions, isAutocompleteLoading, colors } = this.state;
    const isListView = view === 'list';
    const isAddView = view === 'add';
    const isEditView = view === 'edit';
    const saveFunc = isAddView && this.handleNewColorHouseSave || this.handleEditColorHouseSave;

    return (
      <div id="manage-color-houses-container">
        {isListView && (
          <div>
            <button className="btn btn-default add-btn" onClick={this.handleAddClick}>Add New Color House</button>
            <TabularTable
              table={ColorHousesTable}
              id="color-houses-table"
            />
          </div>
        )}
        {(isAddView || isEditView) && (
          <ColorHouseForm
            formFields={formFields}
            colorOptions={colorOptions}
            isAutocompleteLoading={isAutocompleteLoading}
            colors={colors}
            onInputChange={this.handleInputChange}
            onDescriptionChange={this.handleDescriptionChange}
            onColorHouseTagChange={this.handleColorHouseTagChange}
            onSave={saveFunc}
            onBack={this.handleBack}
            onImageUpload={this.handleImageUpload}
            onImageRemove={this.handleImageRemove}
            onColorSearch={this.handleColorSearch}
            onColorAdd={this.handleColorAdd}
            onColorRemove={this.handleColorRemove}
            onSortEnd={this.handleSortEnd}
          />
        )}
      </div>
    );
  }
}

export default withTracker(props => {
  return {
    editColorHouse: Session.get('ColorHouses.editColorHouse') || {},
    deleteColorHouseId: Session.get('ColorHouses.deleteId') || ''
  };
})(ManageColorHousesContainer);
