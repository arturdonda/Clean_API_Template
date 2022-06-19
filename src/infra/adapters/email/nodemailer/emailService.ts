import { IEmailService } from '@application/protocols/utils';
import nodemailer from 'nodemailer';
import { makeEmail } from '../templates';

export class EmailService implements IEmailService {
	private _transport: nodemailer.Transporter;

	constructor() {
		this._transport = nodemailer.createTransport({
			service: 'Outlook',
			auth: {
				user: process.env.EMAIL_SERVICE_USERNAME,
				pass: process.env.EMAIL_SERVICE_PASSWORD,
			},
		});
	}

	send = async ({ to, cc, bcc, subject, body: html }: IEmailService.SendParams): Promise<IEmailService.Result> => {
		const from = `"API Template" <${process.env.EMAIL_SERVICE_USERNAME}>`;

		await this._transport.sendMail({ from, to, cc, bcc, subject, html });
	};

	sendAccountConfirmationEmail = async ({ name, email: to, confirmationCode }: IEmailService.AccountConfirmationParams): Promise<void> => {
		const { body, subject } = makeEmail.accountConfirmation(name, confirmationCode);

		await this.send({ to, subject, body });
	};

	sendForgotPasswordEmail = async ({ name, email: to, resetToken }: IEmailService.ForgotPasswordParams): Promise<void> => {
		const { body, subject } = makeEmail.forgotPassword(name, resetToken);

		await this.send({ to, subject, body });
	};

	sendPasswordChangeConfirmationEmail = async ({ name, email: to }: IEmailService.PasswordChangeConfirmationParams): Promise<void> => {
		const { body, subject } = makeEmail.passwordChangeConfirmation(name);

		await this.send({ to, subject, body });
	};
}
