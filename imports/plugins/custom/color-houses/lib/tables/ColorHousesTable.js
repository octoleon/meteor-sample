import { Template } from 'meteor/templating';
import Tabular from 'meteor/aldeed:tabular';
import { ColorHouses } from '../collections';
import moment from 'moment';

if (Meteor.isClient) {
  import '../../client/templates/colorHouseActionButtons.html';
  import '../../client/templates/colorHouseActionButtons.js';
}

const ColorHousesTable = new Tabular.Table({
  name: 'ColorHouses',
  collection: ColorHouses,
  responsive: true,
  autoWidth: false,
  extraFields: ['_id', 'description', 'imageFileId', 'imageFileName', 'colorIds', 'colorHouseTag'],
  order: [[0, "asc"]],
  columns: [
    {
      data: 'title',
      title: 'Title'
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
      tmpl: Meteor.isClient && Template.colorHouseActionButtons,
      title: 'Actions'
    }
  ]
});

export default ColorHousesTable;
