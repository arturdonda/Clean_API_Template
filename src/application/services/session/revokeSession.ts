import { IRevokeSession } from '@/domain/usecases/session';
import { IUserRepository } from '@/application/protocols/repository';
import { IIpService, ITokenService } from '@/application/protocols/utils';
import { UserNotFoundError } from '@/application/protocols/errors';

export class RevokeSession implements IRevokeSession {
	constructor(
		private readonly sessionTokenService: ITokenService,
		private readonly userRepository: IUserRepository,
		private readonly ipService: IIpService
	) {}

	exec = async ({ sessionToken, ipAddress }: IRevokeSession.Params): Promise<IRevokeSession.Result> => {
		const { audience: userId } = this.sessionTokenService.validate(sessionToken);

		const user = await this.userRepository.getById(userId);

		if (!user) throw new UserNotFoundError();

		const revoker = await this.ipService.lookup(ipAddress);

		user.revokeSession(sessionToken, revoker);

		await this.userRepository.update(user);
	};
}
