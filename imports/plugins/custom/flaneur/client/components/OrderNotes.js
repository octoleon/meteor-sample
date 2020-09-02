import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withMoment } from '@reactioncommerce/reaction-components';

class OrderNotes extends Component {

  static propTypes = {
    order: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);

    this.state = {
      isAddMode: false,
      noteText: '',
      flaneurNotes: []
    };
  }

  componentDidMount () {
    Meteor.call('FlaneurOrders.getNotes', this.props.order._id, (err, flaneurNotes) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ flaneurNotes });
      }
    });
  }

  handleAddClick = e => {
    this.setState({ isAddMode: true});
  };

  handleNoteTextChange = e => {
    this.setState({ noteText: e.target.value });
  };

  handleAddNote = e => {
    e.preventDefault();
    Meteor.call('FlaneurOrders.addNote', this.props.order._id, this.state.noteText, (err, note) => {
      if (err) {
        alert(err.reason);
      } else {
        Alerts.toast('Note added');
        const { flaneurNotes } = this.state;
        flaneurNotes.unshift(note);
        this.setState({
          isAddMode: false,
          noteText: '',
          flaneurNotes
        });
      }
    });
  };

  render () {
    const { isAddMode, flaneurNotes } = this.state;
    const { moment } = this.props;
    return (
      <div
        className="panel panel-default"
        style={{ marginTop: 20, marginLeft: -15, marginRight: -15 }}
      >
        <div className="panel-heading">
          <h3 className="panel-title">
            Notes
            <a href="javascript:void(0)" style={{ float: 'right' }} onClick={this.handleAddClick}>+ add note</a>
          </h3>
        </div>
        <div className="panel-body">
          {isAddMode && (
            <form onSubmit={this.handleAddNote}>
              <textarea className="form-control" onChange={this.handleNoteTextChange}>
              </textarea>
              <input type="submit" className="btn btn-default" value="Save"
                style={{ marginTop: 10, marginBottom: 10 }}
              />
            </form>
          )}
          {!!(flaneurNotes && flaneurNotes.length) && flaneurNotes.map((note, index) => (
            <div key={index} style={{ marginTop: 10, marginBottom: 10 }}>
              <p><strong>{note.userName}</strong> on {moment(note.createdAt).format('MM/DD/YY')}</p>
              <p>{note.text}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default withMoment(OrderNotes);
