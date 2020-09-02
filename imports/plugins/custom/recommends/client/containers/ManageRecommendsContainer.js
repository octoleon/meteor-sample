import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabularTable from '/imports/plugins/custom/flaneur/client/components/TabularTable';
import { RecommendsTable } from '../../lib/tables';
import RecommendsForm from '../components/RecommendsForm';
import { Session } from 'meteor/session';
import { Reaction, Logger } from "/client/api";
import { arrayMove } from '/imports/plugins/custom/flaneur/lib/helpers';
import { withTracker } from 'meteor/react-meteor-data';

class ManageRecommendsContainer extends Component {

  static propTypes = {
    editRecommend: PropTypes.object,
    deleteRecommendId: PropTypes.string
  };

  constructor (props) {
    super(props);

    this.newFormFields = {
      _id: '',
      colorName: '',
      description: '',
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
      this.getRecommendColors(this.state.formFields._id);
    }

    // Bring user to edit form when set
    const { editRecommend } = this.props;
    const prevEditRecommend = prevProps.editRecommend;
    if (editRecommend._id && (!prevEditRecommend._id || prevEditRecommend._id !== editRecommend._id)) {
      this.setState({
        view: 'edit',
        formFields: editRecommend
      });
    }

    // Handle color deletion
    const { deleteRecommendId } = this.props;
    if (deleteRecommendId) {
      this.handleDeleteRecommend(deleteRecommendId);
    }
  }

  handleDeleteRecommend = _id => {
    Session.set('Recommends.deleteId', undefined);
    if (confirm('Are you sure you want to delete this recommend?')) {
      Meteor.call('Recommends.delete', _id, (err) => {
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

  handleNewRecommendSave = e => {
    e.preventDefault();    
    Meteor.call('Recommends.create', this.state.formFields, (err) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ view: 'list' });
      }
    });
  };

  handleEditRecommendSave = e => {    
    e.preventDefault();    
    Meteor.call('Recommends.update', this.state.formFields, (err) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ view: 'list' });
        Session.set('Recommends.editRecommend', undefined);
      }
    });
  };

  handleBack = e => {
    e.preventDefault();
    this.setState({ view: 'list' });
    Session.set('Recommends.editRecommend', undefined);
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

  getRecommendColors = _id => {
    Meteor.call('Recommends.getRecommendColors', _id, (err, colors) => {
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
        formFields.colorName = color.name;
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
      formFields.colorName = '';
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
    const saveFunc = isAddView && this.handleNewRecommendSave || this.handleEditRecommendSave;

    return (
      <div id="manage-recommends-container">
        {isListView && (
          <div>
            <button className="btn btn-default add-btn" onClick={this.handleAddClick}>Add New Recommend</button>
            <TabularTable
              table={RecommendsTable}
              id="recommends-table"
            />
          </div>
        )}
        {(isAddView || isEditView) && (
          <RecommendsForm
            formFields={formFields}
            colorOptions={colorOptions}
            isAutocompleteLoading={isAutocompleteLoading}
            colors={colors}            
            onDescriptionChange={this.handleDescriptionChange}
            onSave={saveFunc}
            onBack={this.handleBack}            
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
    editRecommend: Session.get('Recommends.editRecommend') || {},
    deleteRecommendId: Session.get('Recommends.deleteId') || ''
  };
})(ManageRecommendsContainer);
