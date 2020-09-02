import { Meteor } from 'meteor/meteor';

export default function handleSwatchbookRemoveClick (e, _id) {
  e.preventDefault();
  e.stopPropagation();

  Meteor.call('swatchbook.removeColor', _id, (err, colorName) => {
    if (err) {
      alert(err.reason);
    } else {
      Alerts.toast(`${colorName} removed from your swatchbook`);
    }
  });
};
