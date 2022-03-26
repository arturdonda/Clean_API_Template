import { ITokenService } from '@/application/protocols/utils';

export class MockTokenService implements ITokenService {
	generate = (userId: string, expirationDate?: Date): ITokenService.GenerateResult => {
		const tokenData = {
			audience: userId,
			expiredAt: expirationDate ?? new Date(new Date().valueOf() + 86400000),
			issuedAt: new Date(),
			issuer: 'mock_token_service',
		};

		return { ...tokenData, token: Buffer.from(JSON.stringify(tokenData)).toString('base64') };
	};
	validate = (token: string): ITokenService.ValidateResult => {
		const tokenData = JSON.parse(Buffer.from(token, 'base64').toString());

		return {
			audience: tokenData.audience,
			expiredAt: new Date(tokenData.expiredAt),
			issuedAt: new Date(tokenData.issuedAt),
			issuer: tokenData.issuer,
		};
	};
}
