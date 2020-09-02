import { Template } from 'meteor/templating';
import BeddingBuilderContainer from '../containers/BeddingBuilderContainer';

Template.beddingBuilder.helpers({
  BeddingBuilderContainer () {
    return BeddingBuilderContainer;
  }
})
