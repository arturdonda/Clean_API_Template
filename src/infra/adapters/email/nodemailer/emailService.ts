import { IEmailService } from '@application/protocols/utils';
import nodemailer from 'nodemailer';

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

	send = async ({ to, cc, bcc, subject, body }: IEmailService.SendParams): Promise<IEmailService.Result> => {
		await this._transport.sendMail({
			from: `"API Template" <${process.env.EMAIL_SERVICE_USERNAME}>`,
			to: to,
			cc: cc,
			bcc: bcc,
			subject: subject,
			html: body,
		});
	};

	sendAccountConfirmationEmail = async ({ name, email, confirmationCode }: IEmailService.AccountConfirmationParams): Promise<void> => {
		await this.send({
			to: email,
			subject: 'Confirme a sua conta',
			body: `<p>Olá, ${name}!</p>
			<br>
			<p>Sua conta no API TEMPLATE está quase pronta. Para ativá-la, por favor confirme o seu endereço de email clicando no link abaixo.</p>
			<br>
			<a href="${process.env.API_BASE_URL}/auth/activate/${confirmationCode}" target="_blank">Ativar minha conta/Confirmar meu email</a>
			<br>
			<br>
			<p>Sua conta não será ativada até que seu email seja confirmado.</p>
			<br>
			<p>Se você não se cadastrou no(a) API TEMPLATE recentemente, por favor ignore este email.</p>
			<br>
			<p>Obrigado,</p>
			<p>Equipe API TEMPLATE</p>`,
		});
	};

	sendForgotPasswordEmail = async ({ name, email, resetToken }: IEmailService.ForgotPasswordParams): Promise<void> => {
		await this.send({
			to: email,
			subject: 'Redefinir senha',
			body: `<p>Olá, ${name}</p>
			<br>
			<p>Foi solicitada a alteração da sua senha. <a href="${process.env.API_BASE_URL}/auth/reset-password/${resetToken}" target="_blank">Clique aqui</a> para alterá-la (link válido por ${process.env.RESET_PASSWORD_TOKEN_EXPIRATION_IN_MINUTES} minutos).</p>
			<p>Caso você não tenha solicitado a alteração da senha, por favor desconsidere este email.</p>`,
		});
	};

	sendPasswordChangeConfirmationEmail = async ({ name, email }: IEmailService.PasswordChangeConfirmationParams): Promise<void> => {
		await this.send({
			to: email,
			subject: 'A sua senha foi alterada',
			body: `<p>Olá ${name},</p>
			<br>
			<p>A sua senha foi alterada recentemente. Se você não solicitou esta alteração, <a href="#">clique aqui</a> para alterá-la imediatamente.</p>`,
		});
	};
}
