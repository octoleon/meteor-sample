import { HTTP } from 'meteor/http';
import { Colors } from '../../../../colors/lib/collections';
import { slugify } from '../../../lib/helpers';

export default function setColorSlugs () {
  const anyColor = Colors.findOne();
  if (anyColor && !anyColor.slug) {
    console.log('Setting color slugs');
  } else {
    return;
  }
  
  Colors.find().forEach(color => {
    const slug = slugify(color.name);
    Colors.update(color._id, {
      $set: {
        slug
      }
    });
  });
}
