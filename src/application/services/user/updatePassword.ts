import { IUpdatePassword } from '@/domain/usecases/user';
import { IUserRepository } from '@/application/protocols/repository';
import { InvalidPasswordError, UserNotFoundError } from '@/application/protocols/errors';
import { IHashService } from '@/application/protocols/utils';

export class UpdatePassword implements IUpdatePassword {
	constructor(private readonly userRepository: IUserRepository, private readonly passwordHashService: IHashService) {}

	exec = async ({ userId, password, confirmationPassword }: IUpdatePassword.Params): Promise<IUpdatePassword.Result> => {
		if (password !== confirmationPassword) throw new InvalidPasswordError();

		const user = await this.userRepository.getById(userId);

		if (!user) throw new UserNotFoundError();

		user.password = this.passwordHashService.hash(password);

		await this.userRepository.update(user);
	};
}
