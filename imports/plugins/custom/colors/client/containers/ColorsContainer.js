import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabularTable from '/imports/plugins/custom/flaneur/client/components/TabularTable';
import { ColorsTable } from '../../lib/tables';
import ColorForm from '../components/ColorForm';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import { Reaction, Logger } from "/client/api";

class ColorsContainer extends Component {

  static propTypes = {
    editColor: PropTypes.object,
    deleteColorId: PropTypes.string
  };

  constructor (props) {
    super(props);

    this.newFormFields = {
      _id: '',
      name: '',
      description: '',
      pantoneCode: '',
      hexCode: '',
      colorTag: '',
      slug: ''
    };

    this.state = {
      view: 'list', // list, add, edit
      formFields: {}
    };
  }

  componentDidUpdate (prevProps) {
    // Bring user to edit form when set
    const { editColor } = this.props;
    const prevEditColor = prevProps.editColor;
    if (editColor._id && (!prevEditColor._id || prevEditColor._id !== editColor._id)) {
      this.setState({
        view: 'edit',
        formFields: editColor
      });
    }

    // Handle color deletion
    const { deleteColorId } = this.props;
    if (deleteColorId) {
      this.handleDeleteColor(deleteColorId);
    }
  }

  handleDeleteColor = _id => {
    Session.set('Colors.deleteId', undefined);
    if (confirm('Are you sure you want to delete this color?')) {
      Meteor.call('Colors.delete', _id, (err) => {
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

  handleColorTagChange = colorTag => {
    const { formFields } = this.state;
    formFields.colorTag = colorTag;
    this.setState({ formFields });
  };

  handleNewColorSave = e => {
    e.preventDefault();
    Meteor.call('Colors.create', this.state.formFields, (err) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ view: 'list' });
      }
    });
  };

  handleEditColorSave = e => {
    e.preventDefault();
    Meteor.call('Colors.update', this.state.formFields, (err) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ view: 'list' });
        Session.set('Colors.editColor', undefined);
      }
    });
  };

  handleBack = e => {
    e.preventDefault();
    this.setState({ view: 'list' });
    Session.set('Colors.editColor', undefined);
  }

  render () {
    const { view, formFields } = this.state;
    const isListView = view === 'list';
    const isAddView = view === 'add';
    const isEditView = view === 'edit';
    const saveFunc = isAddView && this.handleNewColorSave || this.handleEditColorSave;

    return (
      <div id="colors-container">
        {isListView && (
          <div>
            <button className="btn btn-default add-btn" onClick={this.handleAddClick}>Add New Color</button>
            <TabularTable
              table={ColorsTable}
              id="colors-table"
            />
          </div>
        )}
        {(isAddView || isEditView) && (
          <ColorForm
            formFields={formFields}
            onInputChange={this.handleInputChange}
            onDescriptionChange={this.handleDescriptionChange}
            onColorTagChange={this.handleColorTagChange}
            onSave={saveFunc}
            onBack={this.handleBack}
          />
        )}
      </div>
    );
  }
}

export default withTracker(props => {
  return {
    editColor: Session.get('Colors.editColor') || {},
    deleteColorId: Session.get('Colors.deleteId') || ''
  };
})(ColorsContainer);
