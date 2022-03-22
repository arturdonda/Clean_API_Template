import { ITokenService } from '@/application/protocols/utils';

export class MockTokenService implements ITokenService {
	generate = (userId: string): ITokenService.GenerateResult => {
		const tokenData = {
			audience: userId,
			expiredAt: new Date(2050, 0, 1).valueOf(),
			issuedAt: new Date().valueOf(),
			issuer: process.env.ISSUER,
		};
		return { ...tokenData, token: Buffer.from(JSON.stringify(tokenData)).toString('base64') };
	};
	validate = (token: string): ITokenService.ValidateResult => {
		return JSON.parse(Buffer.from(token, 'base64').toString()) as ITokenService.ValidateResult;
	};
}
