import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ContentEditor extends Component {

  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func
  };

  constructor (props) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  async componentDidMount () {
    // Manually disable editor tooltips
    const ReactSummernote = await import('react-summernote');
    await import('react-summernote/dist/react-summernote.css');
    this.ReactSummernote = ReactSummernote.default;
    window.ReactSummernote = ReactSummernote.default;
    this.setState({ loaded: true });
    Meteor.setTimeout(() => {
      $('#content-editor button').attr('data-original-title', '');
    }, 1000);
  }

  render () {
    const { value, onChange, onBlur } = this.props;
    const { loaded } = this.state;
    const { ReactSummernote } = this;

    return (
      <div id="content-editor">
        {loaded && (
          <ReactSummernote
            value={value || ''}
            options={{
              height: 350,
              dialogsInBody: true,
              tooltip: false,
              toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'italic', 'underline', 'clear']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'video']],
                ['view', ['fullscreen', 'codeview']]
              ]
            }}
            onChange={onChange}
            onBlur={(e) => { if (onBlur) onBlur(e) }}
          />
        )}
      </div>
    );
  }
}
