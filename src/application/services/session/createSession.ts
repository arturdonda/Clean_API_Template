import { User, Session } from '@domain/entities';
import { ICreateSession } from '@domain/usecases/session';
import { IIpService, ITokenService } from '@application/protocols/utils';

export class CreateSession implements ICreateSession {
	constructor(private readonly sessionTokenService: ITokenService, private readonly ipService: IIpService) {}

	exec = async ({ userId, ipAddress }: ICreateSession.Params): Promise<ICreateSession.Result> => {
		const validId = User.validadeId(userId);

		const sessionToken = this.sessionTokenService.generate(validId);

		return new Session({
			token: sessionToken.token,
			expiredAt: sessionToken.expiredAt,
			createdBy: await this.ipService.lookup(ipAddress),
		});
	};
}
