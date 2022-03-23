import { ITokenService } from '@/application/protocols/utils';

export class MockTokenService implements ITokenService {
	generate = (userId: string, expirationDate?: Date): ITokenService.GenerateResult => {
		const tokenData = {
			audience: userId,
			expiredAt: expirationDate?.valueOf() ?? new Date(2050, 0, 1).valueOf(),
			issuedAt: new Date().valueOf(),
			issuer: 'mock_token_service',
		};
		return { ...tokenData, token: Buffer.from(JSON.stringify(tokenData)).toString('base64') };
	};
	validate = (token: string): ITokenService.ValidateResult => {
		return JSON.parse(Buffer.from(token, 'base64').toString()) as ITokenService.ValidateResult;
	};
}
