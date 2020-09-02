import { Template } from 'meteor/templating';
import Tabular from 'meteor/aldeed:tabular';
import { Pages } from '../collections';
import moment from 'moment';

if (Meteor.isClient) {
  import '../../client/templates/pageActionButtons.html';
  import '../../client/templates/pageActionButtons.js';
}

const PagesTable = new Tabular.Table({
  name: 'Pages',
  collection: Pages,
  responsive: true,
  autoWidth: false,
  extraFields: ['_id', 'body', 'description'],
  order: [[0, "asc"]],
  columns: [
    {
      data: 'title',
      title: 'Title'
    },
    {
      data: 'path',
      title: 'URL path',
      render (val) {
        return `<a href="${Meteor.absoluteUrl()}pages/${val}" target="_blank">${val}</a>`;
      }
    },
    {
      data: 'isPublished',
      title: 'Is Published?'
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
      tmpl: Meteor.isClient && Template.pageActionButtons,
      title: 'Actions'
    }
  ]
});

export default PagesTable;
