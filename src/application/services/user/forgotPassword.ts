import { UserNotFoundError } from '@/application/protocols/errors';
import { IUserRepository } from '@/application/protocols/repository';
import { IEmailService, ITokenService } from '@/application/protocols/utils';
import { IForgotPassword } from '@/domain/usecases/user';

export class ForgotPassword implements IForgotPassword {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly resetTokenService: ITokenService,
		private readonly emailService: IEmailService
	) {}

	exec = async ({ email }: IForgotPassword.Params): Promise<IForgotPassword.Result> => {
		const user = await this.userRepository.getByEmail(email);

		if (!user) throw new UserNotFoundError();

		const resetToken = this.resetTokenService.generate(user.id);

		await this.emailService.send({
			to: [user.email],
			cc: [],
			bcc: [],
			subject: 'Redefinir a sua senha',
			body: makeForgotPasswordEmailBody(user.name, resetToken.token),
		});
	};
}

const makeForgotPasswordEmailBody = (name: string, token: string) => `
Olá ${name},

Esqueceu a sua senha? Sem problemas, vamos cadastrar uma nova senha para você!
<a href="${process.env.RESET_PASSWORD_LINK}/${token}" target="_blank">Redefinir senha</a>

Se você não pediu para redefinir a senha, você pode desconsiderar este e-mail com segurança.
`;
