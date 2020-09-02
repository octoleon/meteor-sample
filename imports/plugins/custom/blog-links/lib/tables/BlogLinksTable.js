import { Template } from 'meteor/templating';
import Tabular from 'meteor/aldeed:tabular';
import { BlogLinks } from '../collections';
import moment from 'moment';

if (Meteor.isClient) {
  import '../../client/templates/blogActionButtons.html';
  import '../../client/templates/blogActionButtons.js';
}

const BlogLinksTable = new Tabular.Table({
  name: 'Blog Links',
  collection: BlogLinks,
  responsive: true,
  autoWidth: false,
  extraFields: ['_id', 'description', 'imageFileId', 'imageFileName'],
  order: [[0, "asc"]],
  columns: [
    {
      data: 'title',
      title: 'Title'
    },
    {
      data: 'url',
      title: 'URL'
    },
    {
      data: 'createdAt',
      title: 'Created',
      render (val) {
        return moment(val).format('MM/DD/YY');
      }
    },
    {
      data: 'updatedAt',
      title: 'Last Updated',
      render (val) {
        return moment(val).format('MM/DD/YY');
      }
    },
    {
      tmpl: Meteor.isClient && Template.blogActionButtons,
      title: 'Actions'
    }
  ]
});

export default BlogLinksTable;
