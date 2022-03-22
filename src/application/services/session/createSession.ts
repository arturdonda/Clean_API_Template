import { Session } from '@/domain/entities/classes';
import { ICreateSession } from '@/domain/usecases/session';
import { IIpService, ITokenService } from '@/application/protocols/utils';

export class CreateSession implements ICreateSession {
	constructor(private readonly refreshTokenService: ITokenService, private readonly ipService: IIpService) {}

	exec = async ({ userId, ipAddress }: ICreateSession.Params): Promise<ICreateSession.Result> => {
		const refreshToken = this.refreshTokenService.generate(userId);

		return new Session({
			token: refreshToken.token,
			expiredAt: new Date(refreshToken.expiredAt),
			createdBy: await this.ipService.lookup(ipAddress),
		});
	};
}
