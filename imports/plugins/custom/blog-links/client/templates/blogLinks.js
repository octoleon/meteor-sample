import { Template } from "meteor/templating";
import BlogLinksContainer from '../containers/BlogLinksContainer';

Template.blogLinks.helpers({
  BlogLinksContainer () {
    return BlogLinksContainer;
  }
});
