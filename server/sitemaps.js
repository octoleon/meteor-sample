import { Mongo } from "meteor/mongo"
import { Products } from "/lib/collections";
import { Colors } from '/imports/plugins/custom/colors/lib/collections';
sitemaps.add('/sitemap.xml', function() {
  const urls = [];
  const colors = Colors.find({}).fetch();
  Products.find({isVisible: true, type: "simple"}).forEach(prod => {
    const slug = prod.handle || prod._id;
    if (prod.template == 'productDetailSimple') {
      colors.forEach(color => {
        urls.push({ page: `/product/${slug}/${color.slug}` });
      });
    } else {
      urls.push({ page: `/product/${slug}` });
    }
  });

  return urls;
});
