import { User } from '@domain/entities';
import { IGetActiveSessions } from '@domain/usecases/user';
import { IUserRepository } from '@application/protocols/repositories';
import { UserNotFoundError } from '@application/errors';

export class GetActiveSessions implements IGetActiveSessions {
	constructor(private readonly userRepository: IUserRepository) {}

	exec = async ({ userId }: IGetActiveSessions.Params): Promise<IGetActiveSessions.Result> => {
		const validId = User.validadeId(userId);

		const user = await this.userRepository.getById(validId);

		if (!user) throw new UserNotFoundError();

		return user.sessions.filter(session => session.isActive);
	};
}
