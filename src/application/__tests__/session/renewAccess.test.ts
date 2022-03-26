import { MockTokenService } from '@/application/__tests__/mock';
import { RenewAccess } from '@/application/services/session';
import { ExpiredTokenError } from '@/application/errors';

describe('Renew Access', () => {
	const tokenService = new MockTokenService();
	const renewAccessService = new RenewAccess(tokenService, tokenService);

	test('Valid session token', async () => {
		const sessionToken = tokenService.generate('1');

		const accessToken = renewAccessService.exec(sessionToken.token);

		expect(tokenService.validate(accessToken).audience).toBe(sessionToken.audience);
	});

	test('Expired session token', async () => {
		const sessionToken = tokenService.generate('1', new Date(2000, 0, 1));

		expect(() => renewAccessService.exec(sessionToken.token)).toThrow(ExpiredTokenError);
	});
});
