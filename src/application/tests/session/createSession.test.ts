import { MockIpService, MockTokenService } from '@/application/tests/mock';
import { CreateSession } from '@/application/services/session';

describe('Create Session', () => {
	const tokenService = new MockTokenService();
	const ipService = new MockIpService();
	const createSessionService = new CreateSession(tokenService, ipService);

	const tokenSpy = jest.spyOn(tokenService, 'generate');

	test('Create Session', async () => {
		const sessionResult = await createSessionService.exec({
			userId: '1',
			ipAddress: '0.0.0.0',
		});

		const tokenResult = tokenSpy.mock.results[0].value;

		expect(tokenSpy).toHaveBeenCalledWith('1');

		expect(sessionResult).toMatchObject({
			token: tokenResult.token,
			expiredAt: new Date(tokenResult.expiredAt * 1000),
			createdBy: expect.objectContaining({
				ip: '0.0.0.0',
			}),
		});

		tokenSpy.mockRestore();
	});
});
