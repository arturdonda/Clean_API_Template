import { User } from '@domain/entities';
import { IActivate } from '@domain/usecases/user';
import { IUserRepository } from '@application/protocols/repositories/user';
import { UserNotFoundError } from '@application/errors';

export class Activate implements IActivate {
	constructor(private readonly userRepository: IUserRepository) {}

	exec = async ({ confirmationCode }: IActivate.Params): Promise<IActivate.Result> => {
		const validConfirmationCode = User.validateConfirmationCode(confirmationCode);

		const user = await this.userRepository.getByConfirmationCode(validConfirmationCode);

		if (!user) throw new UserNotFoundError();

		user.status = 'Active';

		await this.userRepository.update(user);
	};
}
