import { User } from '@domain/entities';
import { IGetUserById } from '@domain/usecases/user';
import { IUserRepository } from '@application/protocols/repositories';
import { UserNotFoundError } from '@application/errors';

export class GetUserById implements IGetUserById {
	constructor(private readonly userRepository: IUserRepository) {}

	exec = async ({ userId }: IGetUserById.Params): Promise<IGetUserById.Result> => {
		const validId = User.validateId(userId);

		const user = await this.userRepository.getById(validId);

		if (!user) throw new UserNotFoundError();

		return user;
	};
}
