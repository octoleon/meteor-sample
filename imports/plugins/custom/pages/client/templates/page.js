import { Template } from 'meteor/templating';
import PageContainer from '../containers/PageContainer';

Template.page.helpers({
  PageContainer () {
    return PageContainer;
  }
});
