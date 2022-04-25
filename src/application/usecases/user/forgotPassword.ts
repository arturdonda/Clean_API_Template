import { User } from '@domain/entities';
import { IForgotPassword } from '@domain/usecases/user';
import { IUserRepository } from '@application/protocols/repositories';
import { IEmailService, ITokenService } from '@application/protocols/utils';

export class ForgotPassword implements IForgotPassword {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly resetTokenService: ITokenService,
		private readonly emailService: IEmailService
	) {}

	exec = async ({ email }: IForgotPassword.Params): Promise<IForgotPassword.Result> => {
		const validEmail = User.validateEmail(email);

		const user = await this.userRepository.getByEmail(validEmail);

		if (!user) return;
		const resetToken = this.resetTokenService.generate(user.id);

		await this.emailService.sendForgotPasswordEmail({ name: user.name, email: user.email, resetToken: resetToken.token });
	};
}
