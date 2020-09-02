import { Template } from 'meteor/templating';
import UploadAnImageContainer from '../containers/UploadAnImageContainer';

Template.uploadAnImage.helpers({
  UploadAnImageContainer () {
    return UploadAnImageContainer;
  }
})
