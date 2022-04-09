import { User } from '@domain/entities';
import { ISignUp } from '@domain/usecases/user';
import { IUserRepository } from '@application/protocols/repositories';
import { IEmailService, IHashService, IUuidService } from '@application/protocols/utils';
import { InvalidPasswordError, UserRegisteredError } from '@application/errors';

export class SignUp implements ISignUp {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly uuidService: IUuidService,
		private readonly passwordHashService: IHashService,
		private readonly emailService: IEmailService
	) {}

	exec = async ({ name, email, password, confirmationPassword }: ISignUp.Params): Promise<ISignUp.Result> => {
		const validName = User.validateName(name);
		const validEmail = User.validateEmail(email);
		const validPassword = User.validatePassword(password);

		if (password !== confirmationPassword) throw new InvalidPasswordError();

		const userExists = !!(await this.userRepository.getByEmail(validEmail));

		if (userExists) throw new UserRegisteredError('E-mail');

		const user = await this.userRepository.create(
			new User({
				confirmationCode: `CC${this.uuidService.generate()}`,
				email: validEmail,
				name: validName,
				password: this.passwordHashService.hash(validPassword),
			})
		);

		await this.emailService.sendAccountConfirmationEmail({ name: user.name, email: user.email, confirmationCode: user.confirmationCode });

		return user;
	};
}
