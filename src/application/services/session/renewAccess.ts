import { IRenewAccess } from '@/domain/usecases/session';
import { ITokenService } from '@/application/protocols/utils';
import { ExpiredTokenError } from '@/application/protocols/errors';

export class RenewAccess implements IRenewAccess {
	constructor(private readonly sessionTokenService: ITokenService, private readonly accessTokenService: ITokenService) {}

	exec = (sessionToken: string): string => {
		const sessionTokenObject = this.sessionTokenService.validate(sessionToken);

		if (new Date(sessionTokenObject.expiredAt * 1000) <= new Date()) throw new ExpiredTokenError();

		return this.accessTokenService.generate(sessionTokenObject.audience).token;
	};
}
