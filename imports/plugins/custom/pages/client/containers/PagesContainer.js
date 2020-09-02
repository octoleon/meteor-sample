import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabularTable from '/imports/plugins/custom/flaneur/client/components/TabularTable';
import { PagesTable } from '../../lib/tables';
import { PagesForm } from '../components';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

class PagesContainer extends Component {

  static propTypes = {
    editPage: PropTypes.object,
    deletePageId: PropTypes.string
  };

  constructor (props) {
    super(props);

    this.newFormFields = {
      _id: '',
      title: '',
      body: '',
      path: '',
      description: '',
      isPublished: false
    };

    this.state = {
      view: 'list', // list, add, edit
      formFields: {}
    };
  }

  componentDidUpdate (prevProps) {
    // Bring user to edit form when set
    const { editPage } = this.props;
    const prevEditPage = prevProps.editPage;
    if (editPage._id && (!prevEditPage._id || prevEditPage._id !== editPage._id)) {
      this.setState({
        view: 'edit',
        formFields: editPage
      });
    }

    // Handle page deletion
    const { deletePageId } = this.props;
    if (deletePageId) {
      this.handleDeletePage(deletePageId);
    }
  }

  handleDeletePage = _id => {
    Session.set('Pages.deleteId', undefined);
    if (confirm('Are you sure you want to delete this page?')) {
      Meteor.call('Pages.delete', _id, (err) => {
        if (err) {
          alert(err.reason);
        } else {
          this.setState({
            view: 'list'
          });
        }
      });
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

  handleBodyChange = body => {
    const { formFields } = this.state;
    formFields.body = body;
    this.setState({ formFields });
  };

  handlePublishedChange = e => {
    const { formFields } = this.state;
    formFields.isPublished = e.target.checked;
    this.setState({ formFields });
  };

  handleNewPageSave = e => {
    e.preventDefault();
    Meteor.call('Pages.create', this.state.formFields, (err) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ view: 'list' });
      }
    });
  };

  handleEditPageSave = e => {
    e.preventDefault();
    Meteor.call('Pages.update', this.state.formFields, (err) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ view: 'list' });
        Session.set('Pages.editPage', undefined);
      }
    });
  };

  handleBack = e => {
    e.preventDefault();
    this.setState({ view: 'list' });
    Session.set('Pages.editPage', undefined);
  }

  render () {
    const { view, formFields } = this.state;
    const isListView = view === 'list';
    const isAddView = view === 'add';
    const isEditView = view === 'edit';
    const pageSaveFunc = isAddView && this.handleNewPageSave || this.handleEditPageSave;

    return (
      <div id="pages-container">
        {isListView && (
          <div>
            <button className="btn btn-default add-btn" onClick={this.handleAddClick}>Add New Page</button>
            <TabularTable
              table={PagesTable}
              id="pages-table"
            />
          </div>
        )}
        {(isAddView || isEditView) && (
          <PagesForm
            formFields={formFields}
            onInputChange={this.handleInputChange}
            onBodyChange={this.handleBodyChange}
            onPublishedChange={this.handlePublishedChange}
            onSave={pageSaveFunc}
            onBack={this.handleBack}
          />
        )}
      </div>
    );
  }
}

export default withTracker(props => {
  return {
    editPage: Session.get('Pages.editPage') || {},
    deletePageId: Session.get('Pages.deleteId') || ''
  };
})(PagesContainer);
