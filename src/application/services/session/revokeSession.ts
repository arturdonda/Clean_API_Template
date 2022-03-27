import { IRevokeSession } from '@domain/usecases/session';
import { IUserRepository } from '@application/protocols/repositories';
import { IIpService } from '@application/protocols/utils';
import { UserNotFoundError } from '@application/errors';

export class RevokeSession implements IRevokeSession {
	constructor(private readonly userRepository: IUserRepository, private readonly ipService: IIpService) {}

	exec = async ({ userId, sessionToken, ipAddress }: IRevokeSession.Params): Promise<IRevokeSession.Result> => {
		const user = await this.userRepository.getById(userId);

		if (!user) throw new UserNotFoundError();

		const revoker = await this.ipService.lookup(ipAddress);

		user.revokeSession(sessionToken, revoker);

		await this.userRepository.update(user);
	};
}
