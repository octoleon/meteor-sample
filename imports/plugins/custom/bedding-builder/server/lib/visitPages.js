import { SSR } from "meteor/meteorhacks:ssr";
import { Reaction } from '/server/api';
import { Accounts, Shops } from "/lib/collections";

export function sendVisitingDesignYourBeddingPageEmail (userId) {

  const shopId = Reaction.getShopId(); // current shop; not primary shop
  const shop = Shops.findOne(shopId);

  let shopEmail;
  // provide some defaults for missing shop email.
  if (!shop.emails) {
    shopEmail = `${shop.name}@localhost`;
    Logger.debug(`Shop email address not configured. Using ${shopEmail}`);
  } else {
    shopEmail = shop.emails[0].address;
  }

  const account = Accounts.findOne(userId);
  const userEmail = account.emails[0].address;

  const tpl = 'visitpages/designYourBedding';
  const subject = 'visitpages/designYourBedding/subject';

  SSR.compileTemplate(tpl, Reaction.Email.getTemplate(tpl));
  SSR.compileTemplate(subject, Reaction.Email.getSubject(tpl));

  Reaction.Email.send({
    to: userEmail,
    from: `${shop.name} <${shopEmail}>`,
    subject: 'Getting the bedding of your dreams',
    html: SSR.render(tpl)
  });
}
