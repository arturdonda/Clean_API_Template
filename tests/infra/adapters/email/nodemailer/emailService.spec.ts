import { EmailService } from '@infra/adapters/email/nodemailer';
import { makeEmail } from '@infra/adapters/email/templates';
const nodemailer = require('nodemailer');

jest.mock('nodemailer');
const sendEmailMock = jest.fn();
nodemailer.createTransport.mockReturnValue({ sendMail: sendEmailMock });

describe('Nodemailer e-mail service', () => {
	const to = 'to@test.com';
	const cc = 'cc@test.com';
	const bcc = 'bcc@test.com';
	const subject = 'Testing nodemailer';
	const body = '<p>test</p>';

	it('should authenticate with env vars', () => {
		new EmailService();

		expect(nodemailer.createTransport).toHaveBeenCalledTimes(1);
		expect(nodemailer.createTransport).toHaveBeenCalledWith({
			service: 'Outlook',
			auth: {
				user: process.env.EMAIL_SERVICE_USERNAME,
				pass: process.env.EMAIL_SERVICE_PASSWORD,
			},
		});
	});

	it('should set parameters properly', () => {
		const emailService = new EmailService();

		emailService.send({ to, cc, bcc, subject, body });

		expect(sendEmailMock).toHaveBeenCalledTimes(1);
		expect(sendEmailMock).toHaveBeenCalledWith({
			from: `"API Template" <${process.env.EMAIL_SERVICE_USERNAME}>`,
			to: to,
			cc: cc,
			bcc: bcc,
			subject: subject,
			html: body,
		});

		sendEmailMock.mockReset();
	});

	it('should send account confirmation email', async () => {
		const emailService = new EmailService();
		const name = 'Test';
		const confirmationCode = 'CCtest';
		const accountConfirmationEmail = makeEmail.accountConfirmation(name, confirmationCode);

		await emailService.sendAccountConfirmationEmail({
			name: name,
			email: to,
			confirmationCode: confirmationCode,
		});

		expect(sendEmailMock).toHaveBeenCalledTimes(1);
		expect(sendEmailMock).toHaveBeenCalledWith({
			from: `"API Template" <${process.env.EMAIL_SERVICE_USERNAME}>`,
			to: to,
			cc: undefined,
			bcc: undefined,
			subject: accountConfirmationEmail.subject,
			html: accountConfirmationEmail.body,
		});

		sendEmailMock.mockReset();
	});

	it('should send forgot password email', async () => {
		const emailService = new EmailService();
		const name = 'Test';
		const resetToken = 'test123';
		const forgotPasswordEmail = makeEmail.forgotPassword(name, resetToken);

		await emailService.sendForgotPasswordEmail({
			name: name,
			email: to,
			resetToken: resetToken,
		});

		expect(sendEmailMock).toHaveBeenCalledTimes(1);
		expect(sendEmailMock).toHaveBeenCalledWith({
			from: `"API Template" <${process.env.EMAIL_SERVICE_USERNAME}>`,
			to: to,
			cc: undefined,
			bcc: undefined,
			subject: forgotPasswordEmail.subject,
			html: forgotPasswordEmail.body,
		});

		sendEmailMock.mockReset();
	});

	it('should send password change confirmation email', async () => {
		const emailService = new EmailService();
		const name = 'Test';
		const passwordChangeConfirmationEmail = makeEmail.passwordChangeConfirmation(name);

		await emailService.sendPasswordChangeConfirmationEmail({
			name: name,
			email: to,
		});

		expect(sendEmailMock).toHaveBeenCalledTimes(1);
		expect(sendEmailMock).toHaveBeenCalledWith({
			from: `"API Template" <${process.env.EMAIL_SERVICE_USERNAME}>`,
			to: to,
			cc: undefined,
			bcc: undefined,
			subject: passwordChangeConfirmationEmail.subject,
			html: passwordChangeConfirmationEmail.body,
		});

		sendEmailMock.mockReset();
	});
});
