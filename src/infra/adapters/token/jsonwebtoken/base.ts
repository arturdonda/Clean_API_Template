import { ITokenService } from '@application/protocols/utils';
import { InvalidTokenError, TokenExpiredError } from '@infra/errors';
import jwt from 'jsonwebtoken';

export class JwtAdapter implements ITokenService {
	constructor(private readonly secret: string, private readonly expiresIn: string) {}

	generate = (userId: string): ITokenService.GenerateResult => {
		const token = jwt.sign({}, this.secret, {
			expiresIn: this.expiresIn,
			issuer: process.env.ISSUER,
			audience: userId,
		});

		const decoded = this.validate(token);

		return { token: token, ...decoded };
	};

	validate = (token: string): ITokenService.ValidateResult => {
		let decoded: jwt.JwtPayload;

		jwt.verify(
			token,
			this.secret,
			{
				issuer: process.env.ISSUER,
			},
			(err: any, payload: jwt.JwtPayload) => {
				if (err) {
					throw err.name === 'TokenExpiredError' ? new TokenExpiredError(new Date(err.expiredAt).toISOString()) : new InvalidTokenError(err.message);
				}

				decoded = payload;
			}
		);

		return {
			issuedAt: decoded.iat ? new Date(decoded.iat * 1000) : new Date(),
			expiredAt: decoded.exp ? new Date(decoded.exp * 1000) : new Date(),
			audience: (decoded.aud as string) ?? '',
			issuer: decoded.iss ?? '',
		};
	};
}
