import { Session } from '@domain/entities';
import { IRenewAccess } from '@domain/usecases/session';
import { ITokenService } from '@application/protocols/utils';
import { ExpiredTokenError } from '@application/errors';

export class RenewAccess implements IRenewAccess {
	constructor(private readonly sessionTokenService: ITokenService, private readonly accessTokenService: ITokenService) {}

	exec = (sessionToken: string): string => {
		const validSessionToken = Session.validateToken(sessionToken);

		const sessionTokenObject = this.sessionTokenService.validate(validSessionToken);

		if (sessionTokenObject.expiredAt <= new Date()) throw new ExpiredTokenError();
		// checar se o token foi revoked!!!
		return this.accessTokenService.generate(sessionTokenObject.audience).token;
	};
}
