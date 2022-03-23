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
			issuedAt: decoded.iat ?? 0,
			expiredAt: decoded.exp ?? 0,
			audience: (decoded.aud as string) ?? '',
			issuer: decoded.iss ?? '',
		};
	};
}

// export const sign = ({ secret, userId, expiresIn }: { secret: string; userId: string; expiresIn: string }): ITokenService.GenerateResult => {
// 	const token = jwt.sign({}, secret, {
// 		expiresIn: expiresIn,
// 		issuer: process.env.ISSUER,
// 		audience: userId,
// 	});

// 	const decoded = verify({ token, secret });

// 	return { token: token, ...decoded };
// };

// export const verify = ({ token, secret }: { token: string; secret: string }): ITokenService.ValidateResult => {
// 	const decoded = jwt.verify(token, secret, {
// 		issuer: process.env.ISSUER,
// 	}) as jwt.JwtPayload;

// 	return {
// 		issuedAt: decoded.iat ?? 0,
// 		expiredAt: decoded.exp ?? 0,
// 		audience: (decoded.aud as string) ?? '',
// 		issuer: decoded.iss ?? '',
// 	};
// };
