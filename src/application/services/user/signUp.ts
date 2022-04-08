import { User } from '@domain/entities';
import { ISignUp } from '@domain/usecases/user';
import { IUserRepository } from '@application/protocols/repositories';
import { IHashService, IUuidService } from '@application/protocols/utils';
import { InvalidPasswordError, UserRegisteredError } from '@application/errors';

export class SignUp implements ISignUp {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly uuidService: IUuidService,
		private readonly passwordHashService: IHashService
	) {}

	exec = async ({ name, email, password, confirmationPassword }: ISignUp.Params): Promise<ISignUp.Result> => {
		const validName = User.validateName(name);
		const validEmail = User.validateEmail(email);
		const validPassword = User.validatePassword(password);

		if (password !== confirmationPassword) throw new InvalidPasswordError();

		const userExists = !!(await this.userRepository.getByEmail(validEmail));

		if (userExists) throw new UserRegisteredError('E-mail');

		return await this.userRepository.create(
			new User({
				confirmationCode: `CC${this.uuidService.generate()}`,
				email: validEmail,
				name: validName,
				password: this.passwordHashService.hash(validPassword),
			})
		);
	};
}
