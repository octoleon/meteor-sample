import { Template } from 'meteor/templating';
import Tabular from 'meteor/aldeed:tabular';
import { Colors } from '../collections';
import moment from 'moment';

if (Meteor.isClient) {
  import '../../client/templates/colorActionButtons.html';
  import '../../client/templates/colorActionButtons.js';
}

const ColorsTable = new Tabular.Table({
  name: 'Colors',
  collection: Colors,
  responsive: true,
  autoWidth: false,
  extraFields: ['_id', 'description', 'colorTag', 'slug'],
  order: [[0, "asc"]],
  columns: [
    {
      data: 'name',
      title: 'Name'
    },
    {
      data: 'pantoneCode',
      title: 'Pantone Code'
    },
    {
      data: 'hexCode',
      title: 'HEX Code'
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
      tmpl: Meteor.isClient && Template.colorActionButtons,
      title: 'Actions'
    }
  ]
});

export default ColorsTable;
