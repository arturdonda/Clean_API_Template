import { mockTokenService } from '@tests/_factories/adapters';
import { makeCreateSession } from '@tests/_factories/usecases';

describe('Create Session', () => {
	const createSessionService = makeCreateSession();

	const tokenSpy = jest.spyOn(mockTokenService, 'generate');

	test('Create Session', async () => {
		const sessionResult = await createSessionService.exec({
			userId: '1',
			ipAddress: '0.0.0.0',
		});

		const tokenResult = tokenSpy.mock.results[0].value;

		expect(tokenSpy).toHaveBeenCalledWith('1');

		expect(sessionResult).toMatchObject({
			token: tokenResult.token,
			expiredAt: tokenResult.expiredAt,
			createdBy: expect.objectContaining({
				ip: '0.0.0.0',
			}),
		});

		tokenSpy.mockRestore();
	});
});
