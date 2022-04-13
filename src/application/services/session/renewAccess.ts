import { Session } from '@domain/entities';
import { IRenewAccess } from '@domain/usecases/session';
import { ITokenService } from '@application/protocols/utils';
import { IUserRepository } from '@application/protocols/repositories';
import { ExpiredTokenError, RevokedTokenError, UserNotFoundError } from '@application/errors';

export class RenewAccess implements IRenewAccess {
	constructor(
		private readonly sessionTokenService: ITokenService,
		private readonly accessTokenService: ITokenService,
		private readonly userRepository: IUserRepository
	) {}

	exec = async (sessionToken: string): Promise<string> => {
		const validSessionToken = Session.validateToken(sessionToken);

		const sessionTokenObject = this.sessionTokenService.validate(validSessionToken);

		const user = await this.userRepository.getById(sessionTokenObject.audience);

		if (!user) throw new UserNotFoundError();

		if (user.getSession(validSessionToken).revokedAt) throw new RevokedTokenError();
		if (user.getSession(validSessionToken).isExpired) throw new ExpiredTokenError();

		return this.accessTokenService.generate(sessionTokenObject.audience).token;
	};
}
