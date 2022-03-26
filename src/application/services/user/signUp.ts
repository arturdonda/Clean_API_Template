import { User } from '@/domain/entities/classes';
import { ISignUp } from '@/domain/usecases/user';
import { IUserRepository } from '@/application/protocols/repositories';
import { IHashService, IUuidService } from '@/application/protocols/utils';
import { InvalidPasswordError, UserRegisteredError } from '@/application/protocols/errors';

export class SignUp implements ISignUp {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly uuidService: IUuidService,
		private readonly passwordHashService: IHashService
	) {}

	exec = async ({ name, email, password, confirmationPassword }: ISignUp.Params): Promise<ISignUp.Result> => {
		if (password !== confirmationPassword) throw new InvalidPasswordError();

		const userExists = !!(await this.userRepository.getByEmail(User.validateEmail(email)));

		if (userExists) throw new UserRegisteredError();

		return await this.userRepository.create(
			new User({
				confirmationCode: `CC${this.uuidService.generate()}`,
				email: email,
				name: name,
				password: this.passwordHashService.hash(password),
			})
		);
	};
}
