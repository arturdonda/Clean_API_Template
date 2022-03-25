import { ITokenService } from '@/application/protocols/utils';
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
		const decoded = jwt.verify(token, this.secret, {
			issuer: process.env.ISSUER,
		}) as jwt.JwtPayload;

		return {
			issuedAt: decoded.iat ? new Date(decoded.iat * 1000) : new Date(),
			expiredAt: decoded.exp ? new Date(decoded.exp * 1000) : new Date(),
			audience: (decoded.aud as string) ?? '',
			issuer: decoded.iss ?? '',
		};
	};
}
