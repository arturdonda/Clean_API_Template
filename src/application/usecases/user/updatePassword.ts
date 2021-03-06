import { User } from '@domain/entities';
import { IUpdatePassword } from '@domain/usecases/user';
import { IEmailService, IHashService } from '@application/protocols/utils';
import { IUserRepository } from '@application/protocols/repositories';
import { InvalidPasswordError, UserNotFoundError } from '@application/errors';

export class UpdatePassword implements IUpdatePassword {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly passwordHashService: IHashService,
		private readonly emailService: IEmailService
	) {}

	exec = async ({ userId, password, confirmationPassword }: IUpdatePassword.Params): Promise<IUpdatePassword.Result> => {
		const validId = User.validateId(userId);
		const validPassword = User.validatePassword(password);

		if (password !== confirmationPassword) throw new InvalidPasswordError();

		const user = await this.userRepository.getById(validId);

		if (!user) throw new UserNotFoundError();

		user.password = this.passwordHashService.hash(validPassword);

		await this.userRepository.update(user);

		await this.emailService.sendPasswordChangeConfirmationEmail({ name: user.name, email: user.email });
	};
}
