import { IActivate } from '@/domain/usecases/user';
import { IUserRepository } from '@/application/protocols/repositories/user';
import { UserNotFoundError } from '@/application/protocols/errors';

export class Activate implements IActivate {
	constructor(private readonly userRepository: IUserRepository) {}

	exec = async ({ confirmationCode }: IActivate.Params): Promise<IActivate.Result> => {
		const user = await this.userRepository.getByConfirmationCode(confirmationCode);

		if (!user) throw new UserNotFoundError();

		user.status = 'Active';

		await this.userRepository.update(user);
	};
}
