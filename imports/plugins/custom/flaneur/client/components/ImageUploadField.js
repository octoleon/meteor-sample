/**
 * @file
 * Simple image upload field
 */

import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Reaction } from '/client/api';
import { FileRecord } from "@reactioncommerce/file-collections";
import { getImageURL } from '../../lib/helpers';

export default class ImageUploadField extends Component {

  constructor (props) {
    super(props);

    this.state = {
      isUploading: false
    };
  }

  static propTypes = {
    label: PropTypes.string.isRequired,
    fileId: PropTypes.string,
    fileName: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
  };

  onChange = e => {
    const fileInfo = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (fileLoadEvent) => {
      const fileData = fileReader.result;
      const fileRecord = FileRecord.fromFile(fileInfo);
      fileRecord.metadata = {
        shopId: Reaction.getShopId()
      };
      this.setState({ isUploading: true });
      const promise = fileRecord.upload({})
        // We insert only AFTER the server has confirmed that all chunks were uploaded
        .then(() => {
          Meteor.call("media/insert", fileRecord.document, (error, mediaId) => {
            this.setState({ isUploading: false });
            if (error) {
              alert(err.reason);
            } else {
              this.props.onChange(mediaId, fileInfo.name);
            }
          });
        })
        .catch((error) => {
          Logger.error(error);
        });
    };
    fileReader.readAsBinaryString(fileInfo);
  };

  render () {
    const {
      label,
      fileId,
      fileName,
      onChange,
      onRemove
    } = this.props;
    const { isUploading } = this.state;
    const fileUrl = getImageURL(fileId, fileName);
    return (
      <div className="form-group">
        <label>{label}</label>
        {(!isUploading && !fileId) && (
          <input type="file" onChange={this.onChange} />
        )}
        {(!isUploading && fileId) && (
          <p>
            <strong><a href={fileUrl} target="_blank">{fileName}</a></strong>
            - <a href="javascript:void(0)" onClick={onRemove}>Remove</a>
          </p>
        )}
        {isUploading && (
          <p>Uploading...</p>
        )}
      </div>
    );
  }
}
