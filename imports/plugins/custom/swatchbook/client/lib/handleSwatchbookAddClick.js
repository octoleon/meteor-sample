import { Meteor } from 'meteor/meteor';

export default function handleSwatchbookAddClick (e, _id) {
  e.preventDefault();
  e.stopPropagation();

  Meteor.call('swatchbook.addColor', _id, (err, colorName) => {
    if (err) {
      alert(err.reason);
    } else {
      Alerts.toast(`${colorName} added to your swatchbook`);
    }
  });
};
