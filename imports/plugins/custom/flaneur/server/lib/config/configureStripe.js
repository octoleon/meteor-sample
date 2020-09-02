import { Meteor } from 'meteor/meteor';
import { Reaction } from '/server/api';
import { Packages } from '/lib/collections';

export default function configureStripe () {
  const stripePackage = Packages.findOne({ name: 'reaction-stripe' });
  if (stripePackage && stripePackage.settings.apiKey !== Meteor.settings.stripeApiKey) {
    console.log('Updating Stripe API key');
    Packages.update(stripePackage._id, {
      $set: {
        settings: {
          mode: false,
          api_key: Meteor.settings.stripeApiKey,
          'reaction-stripe': {
            enabled: true,
            support: [
              'Authorize',
              'Capture',
              'Refund'
            ]
          },
          'public': {
            'client_id': ''
          },
          'connectAuth': {}
        }
      }
    });
  }
}
