import { ITokenService } from '@application/protocols/utils';
import { JwtAdapter } from './base';

export class SessionTokenService implements ITokenService {
	private readonly _secret = process.env.SESSION_TOKEN_SECRET;
	private readonly _expiresIn = `${process.env.SESSION_TOKEN_EXPIRATION_IN_DAYS}d`;

	private readonly _jwtAdapter = new JwtAdapter(this._secret, this._expiresIn);

	generate = (userId: string): ITokenService.GenerateResult => {
		return this._jwtAdapter.generate(userId);
	};
	validate = (token: string): ITokenService.ValidateResult => {
		return this._jwtAdapter.validate(token);
	};
}
