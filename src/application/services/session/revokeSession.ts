import { IRevokeSession } from '@/domain/usecases/session';
import { IUserRepository } from '@/application/protocols/repository';
import { IIpService, ITokenService } from '@/application/protocols/utils';
import { UserNotFoundError } from '@/application/protocols/errors';

export class RevokeSession implements IRevokeSession {
	constructor(private readonly tokenService: ITokenService, private readonly userRepository: IUserRepository, private readonly ipService: IIpService) {}

	exec = async ({ refreshToken, ipAddress }: IRevokeSession.Params): Promise<IRevokeSession.Result> => {
		const { audience: userId } = this.tokenService.validate(refreshToken);

		const user = await this.userRepository.getById(userId);

		if (!user) throw new UserNotFoundError();

		const revoker = await this.ipService.lookup(ipAddress);

		user.revokeSession(refreshToken, revoker);

		await this.userRepository.update(user);
	};
}
