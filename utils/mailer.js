const nodeMailer = require("nodemailer");

require("dotenv").config();

const env = process.env;

const adminEmail = env.ADMIN_EMAIL;

const adminPassword = env.ADMIN_PASSWORD;

const mailHost = env.MAIL_HOST;

const mailPort = parseInt(env.MAIL_PORT, 10);

const mailFrom = env.MAIL_FROM;

const sendMail = function(to, subject, text, html) {
	const transporter = nodeMailer.createTransport({
		host: mailHost,
		port: mailPort,
		secure: true,
		auth: {
			user: adminEmail,
			pass: adminPassword
		}
	});
	const options = {
		from: `"${mailFrom}" ${adminEmail}`,
		to,
		subject,
		text,
		html
	};
	return transporter.sendMail(options);
};

exports.sendMail = sendMail;
