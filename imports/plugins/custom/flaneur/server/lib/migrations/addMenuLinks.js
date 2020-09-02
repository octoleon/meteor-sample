/**
 * @file
 * Migration that creates menu links for color houses & bedding builder
 */

import { Assets } from '/lib/collections';

export default function addMenuLinks () {
  const mainMenuAsset = Assets.findOne({ name: 'mainMenu' });
  if (!mainMenuAsset) {
    Assets.insert({
      name: 'mainMenu',
      type: 'setting',
      content: JSON.stringify([
        {
          label: 'Home',
          path: '/'
        },
        {
          label: 'Design your Bedding',
          path: '/design-your-bedding'
        },
        {
          label: 'Color Houses',
          path: '/color-houses'
        }
      ])
    });
  }
}
