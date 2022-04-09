import { IEmailService } from '@application/protocols/utils';

export class MockEmailService implements IEmailService {
	send = async ({ to, cc, bcc, subject, body }: IEmailService.SendParams): Promise<IEmailService.Result> => {
		return new Promise((resolve, reject) => resolve());
	};

	sendAccountConfirmationEmail = async ({ name, email, confirmationCode }: IEmailService.AccountConfirmationParams): Promise<IEmailService.Result> => {
		return new Promise((resolve, reject) => resolve());
	};

	sendForgotPasswordEmail = async ({ name, email, resetToken }: IEmailService.ForgotPasswordParams): Promise<IEmailService.Result> => {
		return new Promise((resolve, reject) => resolve());
	};

	sendPasswordChangeConfirmationEmail = async ({ name, email }: IEmailService.PasswordChangeConfirmationParams): Promise<IEmailService.Result> => {
		return new Promise((resolve, reject) => resolve());
	};
}
