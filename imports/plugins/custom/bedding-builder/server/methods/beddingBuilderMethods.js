import { Meteor } from 'meteor/meteor';
import { sendVisitingDesignYourBeddingPageEmail } from '../lib/visitPages';
import { Accounts } from "/lib/collections";
import { Jobs } from "/lib/collections";

Meteor.methods({
	'Visit.DesignYourBeddingPage' (userId) {
		check(userId, String);

		Meteor.defer(() => {
			sendVisitingDesignYourBeddingPageEmail(userId);
		});
	},

	'IsDesignYourBeddingPageVisitedUser' (userId) {
		check(userId, String);

		const account = Accounts.findOne(userId);
		if (!account || !account.emails.length) { // if no one is logged in
			return true;
		}
		const userEmail = account.emails[0].address;
		const emailLogs = Jobs.find({
			type: "sendEmail",
    	status: "completed"
		}, {
				fields: {
				data: 1
			}
		}).map((log) => log.data);

		const filteredLogs = emailLogs.filter(log => (log.to === userEmail && log.subject === 'Getting the bedding of your dreams'));

		if (filteredLogs.length) {
			return true;
		} else {
			return false;
		}
	}
});
