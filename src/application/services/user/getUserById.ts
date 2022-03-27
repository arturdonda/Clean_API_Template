import { IGetUserById } from '@domain/usecases/user';
import { IUserRepository } from '@application/protocols/repositories';
import { UserNotFoundError } from '@application/errors';

export class GetUserById implements IGetUserById {
	constructor(private readonly userRepository: IUserRepository) {}

	exec = async ({ userId }: IGetUserById.Params): Promise<IGetUserById.Result> => {
		const user = await this.userRepository.getById(userId);

		if (!user) throw new UserNotFoundError();

		return user;
	};
}
