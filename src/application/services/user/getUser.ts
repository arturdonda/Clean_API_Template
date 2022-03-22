import { IGetUser } from '@/domain/usecases/user';
import { IUserRepository } from '@/application/protocols/repository';
import { UserNotFoundError } from '@/application/protocols/errors';

export class GetUserProfile implements IGetUser {
	constructor(private readonly userRepository: IUserRepository) {}

	exec = async ({ userId }: IGetUser.Params): Promise<IGetUser.Result> => {
		const user = await this.userRepository.getById(userId);

		if (!user) throw new UserNotFoundError();

		return user;
	};
}
