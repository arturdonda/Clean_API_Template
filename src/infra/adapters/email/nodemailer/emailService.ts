import { IEmailService } from '@application/protocols/utils';
import nodemailer from 'nodemailer';

export class EmailService implements IEmailService {
	private _transport: nodemailer.Transporter;

	constructor() {
		this._transport = nodemailer.createTransport({
			service: 'Outlook',
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		});
	}
	send = async ({ to, cc, bcc, subject, body }: IEmailService.Params): Promise<IEmailService.Result> => {
		await this._transport.sendMail({
			from: `"API Template" <${process.env.EMAIL_USERNAME}>`,
			to: to,
			cc: cc,
			bcc: bcc,
			subject: subject,
			html: body,
		});
	};
}
