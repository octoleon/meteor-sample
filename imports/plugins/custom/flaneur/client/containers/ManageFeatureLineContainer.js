import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Loadable from 'react-loadable';
const ContentEditor = Loadable({
  loader: async () => {
    const component = await import('/imports/plugins/custom/flaneur/client/components/ContentEditor');
    return component.default;
  },
  loading: () => null
});

export default class ManageFeatureLineContainer extends Component {

  constructor (props) {
    super(props);

    this.state = {
      content: '',
      isEnabled: false
    };
  }

  componentDidMount () {
    Meteor.call('Flaneur.getFeatureLine', (err, state) => {
      this.setState(state);
    });
  }

  handleContentChange = content => {
    this.setState({ content });
  };

  handleEnabledChange = e => {
    this.setState({ isEnabled: e.target.checked });
  }

  handleUpdateFeatureLine = e => {
    e.preventDefault();
    Meteor.call('Flaneur.updateFeatureLine', this.state, (err) => {
      if (err) {
        alert(err.reason);
      } else {
        alert('Your changes have been saved.');
      }
    });
  };

  render () {
    const { content, isEnabled } = this.state;
    return (
      <div id="manage-feature-line-container">
        <div className="form-group">
          <label>Content</label>
          <ContentEditor value={content} onChange={this.handleContentChange} />
        </div>
        <div className="form-group">
          <input
            type="checkbox"
            name="isEnabled"
            checked={isEnabled}
            onChange={this.handleEnabledChange}
            className="form-check-input"
          />
          <label className="form-check-label">&nbsp;&nbsp;Enabled?</label>
        </div>
        <button className="btn btn-default" onClick={this.handleUpdateFeatureLine}>Save</button>
      </div>
    );
  }
}
