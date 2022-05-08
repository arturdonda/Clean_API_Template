import { User, Session } from '@domain/entities';
import { IRevokeSession } from '@domain/usecases/session';
import { IUserRepository } from '@application/protocols/repositories';
import { IIpService } from '@application/protocols/utils';
import { UserNotFoundError } from '@application/errors';

export class RevokeSession implements IRevokeSession {
	constructor(private readonly userRepository: IUserRepository, private readonly ipService: IIpService) {}

	exec = async ({ userId, sessionToken, ipAddress }: IRevokeSession.Params): Promise<IRevokeSession.Result> => {
		const validId = User.validateId(userId);
		const validSessionToken = Session.validateToken(sessionToken);

		const user = await this.userRepository.getById(validId);

		if (!user) throw new UserNotFoundError();

		const revoker = await this.ipService.lookup(ipAddress);

		user.revokeSession(validSessionToken, revoker);

		await this.userRepository.update(user);
	};
}
