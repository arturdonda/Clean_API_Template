import { RenewAccess } from '@application/services/session';
import { MockTokenService } from '@application/__tests__/mock';
import { RenewAccessController } from '@presentation/controllers/session';

describe('Renew Access Controller', () => {
	const tokenService = new MockTokenService();
	const renewAccessService = new RenewAccess(tokenService, tokenService);
	const renewAccessController = new RenewAccessController(renewAccessService);

	const { token: sessionToken } = tokenService.generate('1');

	test('With required parameter', async () => {
		const serviceSpy = jest.spyOn(renewAccessService, 'exec');

		expect(
			await renewAccessController.handle({
				ip: '0.0.0.0',
				userId: '',
				query: null,
				cookies: { sessionToken: sessionToken },
				headers: null,
				body: null,
			})
		).toMatchObject(
			expect.objectContaining({
				statusCode: 200,
				body: {
					success: true,
					message: 'Acesso renovado com sucesso.',
					result: null,
				},
				headers: expect.objectContaining({ authorization: expect.any(String) }),
			})
		);

		expect(serviceSpy).toHaveBeenCalledTimes(1);

		serviceSpy.mockRestore();
	});
});
