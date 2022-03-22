import { IGetActiveSessions } from '@/domain/usecases/user';
import { IUserRepository } from '@/application/protocols/repository';
import { UserNotFoundError } from '@/application/protocols/errors';

export class GetActiveSessions implements IGetActiveSessions {
	constructor(private readonly userRepository: IUserRepository) {}

	exec = async ({ userId }: IGetActiveSessions.Params): Promise<IGetActiveSessions.Result> => {
		const user = await this.userRepository.getById(userId);

		if (!user) throw new UserNotFoundError();

		return user.sessions;
	};
}
