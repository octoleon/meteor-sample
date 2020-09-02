import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

export default class Autocomplete extends Component {

  static propTypes = {
    labelKey: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
    onEnter: PropTypes.func
  };

  constructor (props) {
    super(props);
  }

  onKeyDown = e => {
    if (e.key === 'Enter' && this.props.onEnter) {
      this._typeahead.getInstance().clear();
      this.props.onEnter(e.target.value);
    }
  };

  render () {
    const {
      labelKey,
      isLoading,
      placeholder,
      options,
      onSearch,
      onEnter
    } = this.props;

    return (
      <AsyncTypeahead
        ref={(ref) => this._typeahead = ref}
        labelKey={labelKey}
        placeholder={placeholder}
        isLoading={isLoading}
        options={options}
        minLength={3}
        onSearch={onSearch}
        onKeyDown={this.onKeyDown}
      />
    )
  }
}
