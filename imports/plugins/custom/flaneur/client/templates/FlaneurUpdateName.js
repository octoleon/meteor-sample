import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";
import { compose, withProps } from "recompose";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Meteor } from "meteor/meteor";
import { Accounts } from "/lib/collections";

class FlaneurUpdateName extends Component {
  static propTypes = {
    name: PropTypes.string,
    handleUpdateName: PropTypes.func.isRequired,
    uniqueId: PropTypes.string
  }

  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      showSpinner: false
    };
  }

  handleFieldChange = (event, value, field) => {
    this.setState({
      [field]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault;
    this.setState({ showSpinner: true });
    const options = {
      newName: this.state.name
    };
    this.props.handleUpdateName(options, () => this.setState({ showSpinner: false }));
  }

  render() {
    const { showSpinner } = this.state;

    return (
      <div>
        <Components.TextField
          i18nKeyLabel="accountsUI.fullName"
          label="Name"
          name="name"
          type="text"
          id={`name-${this.props.uniqueId}`}
          value={this.state.name}
          onChange={this.handleFieldChange}
        />
        <Components.Button
          bezelStyle={"solid"}
          icon={showSpinner ? "fa fa-spin fa-circle-o-notch" : ""}
          i18nKeyLabel={showSpinner ? "accountsUI.updatingEmailAddress" : "accountsUI.updateEmailAddress"}
          label={showSpinner ? "Updating Name" : "Update Name"}
          status={"primary"}
          onClick={this.handleSubmit}
          disabled={this.state.name === this.props.name}
        />
      </div>
    );
  }
}

const handlers = {
  handleUpdateName({ newName }, callback) {

    Meteor.call("accounts/updateName", newName, () => {
      Alerts.toast("Name has been updated successfully", "success");
      return callback();
    });
  }
};

const composer = (props, onData) => {
  const user = Accounts.findOne(Meteor.userId());
  const name = user.name ? user.name : "";
  onData(null, { name });
};

registerComponent("FlaneurUpdateName", FlaneurUpdateName, [
  composeWithTracker(composer),
  withProps(handlers)
]);

export default compose(
  composeWithTracker(composer),
  withProps(handlers)
)(FlaneurUpdateName);
