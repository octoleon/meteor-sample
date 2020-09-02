import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabularTable from '/imports/plugins/custom/flaneur/client/components/TabularTable';
import { BlogLinksTable } from '../../lib/tables';
import BlogLinkForm from '../components/BlogLinkForm';
import { Session } from 'meteor/session';
import { Reaction, Logger } from "/client/api";
import { Media } from "/imports/plugins/core/files/client";
import { withTracker } from 'meteor/react-meteor-data';

class BlogLinksContainer extends Component {

  static propTypes = {
    editBlogLink: PropTypes.object,
    deleteBlogLinkId: PropTypes.string
  };

  constructor (props) {
    super(props);

    this.newFormFields = {
      _id: '',
      title: '',
      imageFileId: '',
      imageFileName: '',
      description: '',
      url: '',
    };

    this.state = {
      view: 'list', // list, add, edit
      formFields: {}
    };
  }

  componentDidUpdate (prevProps) {
    // Bring user to edit form when set
    const { editBlogLink } = this.props;
    const prevEditBlogLink = prevProps.editBlogLink;
    if (editBlogLink._id && (!prevEditBlogLink._id || prevEditBlogLink._id !== editBlogLink._id)) {
      this.setState({
        view: 'edit',
        formFields: editBlogLink
      });
    }

    // Handle color deletion
    const { deleteBlogLinkId } = this.props;
    if (deleteBlogLinkId) {
      this.handleDeleteBlogLink(deleteBlogLinkId);
    }
  }

  handleDeleteBlogLink = _id => {
    Session.set('BlogLinks.deleteId', undefined);
    if (confirm('Are you sure you want to delete this blog post link?')) {
      Meteor.call('BlogLinks.delete', _id, (err) => {
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

  handleDescriptionChange = description => {
    const { formFields } = this.state;
    formFields.description = description;
    this.setState({ formFields });
  };

  handleNewBlogLinkSave = e => {
    e.preventDefault();
    Meteor.call('BlogLinks.create', this.state.formFields, (err) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ view: 'list' });
      }
    });
  };

  handleEditBlogLinkSave = e => {
    e.preventDefault();
    Meteor.call('BlogLinks.update', this.state.formFields, (err) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ view: 'list' });
        Session.set('BlogLinks.editBlogLink', undefined);
      }
    });
  };

  handleBack = e => {
    e.preventDefault();
    this.setState({ view: 'list' });
    Session.set('BlogLinks.editBlogLink', undefined);
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

  render () {
    const { view, formFields } = this.state;
    const isListView = view === 'list';
    const isAddView = view === 'add';
    const isEditView = view === 'edit';
    const saveFunc = isAddView && this.handleNewBlogLinkSave || this.handleEditBlogLinkSave;

    return (
      <div id="blog-links-container">
        {isListView && (
          <div>
            <button className="btn btn-default add-btn" onClick={this.handleAddClick}>Add New Blog Link</button>
            <TabularTable
              table={BlogLinksTable}
              id="blog-links-table"
            />
          </div>
        )}
        {(isAddView || isEditView) && (
          <BlogLinkForm
            formFields={formFields}
            onInputChange={this.handleInputChange}
            onDescriptionChange={this.handleDescriptionChange}
            onSave={saveFunc}
            onBack={this.handleBack}
            onImageUpload={this.handleImageUpload}
            onImageRemove={this.handleImageRemove}
          />
        )}
      </div>
    );
  }
}

export default withTracker(props => {
  return {
    editBlogLink: Session.get('BlogLinks.editBlogLink') || {},
    deleteBlogLinkId: Session.get('BlogLinks.deleteId') || ''
  };
})(BlogLinksContainer);
