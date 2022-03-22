import { IRenewAccess } from '@/domain/usecases/session';
import { ITokenService } from '@/application/protocols/utils';

export class RenewAccess implements IRenewAccess {
	constructor(private readonly tokenService: ITokenService) {}

	exec = (sessionToken: string): string => {
		const refreshToken = this.tokenService.validate(sessionToken);

		if (refreshToken.expiredAt <= new Date().valueOf()) throw new Error('Token expirado');

		return this.tokenService.generate(refreshToken.audience).token;
	};
}
