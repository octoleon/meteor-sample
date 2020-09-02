import { Template } from 'meteor/templating';
import Tabular from 'meteor/aldeed:tabular';
import { Recommends } from '../collections';
import moment from 'moment';

if (Meteor.isClient) {
  import '../../client/templates/recommendsActionButtons.html';
  import '../../client/templates/recommendsActionButtons.js';
}

const RecommendsTable = new Tabular.Table({
  name: 'Recommends',
  collection: Recommends,
  responsive: true,
  autoWidth: false,
  extraFields: ['_id', 'description', 'colorIds'],  
  order: [[0, "asc"]],
  columns: [
    {
      data: 'colorName',
      title: 'Color Name'
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
      tmpl: Meteor.isClient && Template.recommendsActionButtons,
      title: 'Actions'
    }
  ]
});

export default RecommendsTable;
