export interface IEmailService {
	send: ({ to, cc, bcc, subject, body }: IEmailService.SendParams) => Promise<IEmailService.Result>;
	sendAccountConfirmationEmail: ({ name, email, confirmationCode }: IEmailService.AccountConfirmationParams) => Promise<IEmailService.Result>;
	sendForgotPasswordEmail: ({ name, email, resetToken }: IEmailService.ForgotPasswordParams) => Promise<IEmailService.Result>;
	sendPasswordChangeConfirmationEmail: ({ name, email }: IEmailService.PasswordChangeConfirmationParams) => Promise<IEmailService.Result>;
}

export namespace IEmailService {
	export type SendParams = { to: string[] | string; cc?: string[] | string; bcc?: string[] | string; subject: string; body: string };
	export type AccountConfirmationParams = { name: string; email: string; confirmationCode: string };
	export type ForgotPasswordParams = { name: string; email: string; resetToken: string };
	export type PasswordChangeConfirmationParams = { name: string; email: string };
	export type Result = void;
}
