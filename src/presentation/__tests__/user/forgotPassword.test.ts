import { ForgotPassword } from '@application/services/user';
import { MockEmailService, MockTokenService, MockUserRepository } from '@application/__tests__/mock';
import { ForgotPasswordController } from '@presentation/controllers/user';
import { MissingParamError } from '@presentation/errors';

describe('Forgot Password Controller', () => {
	const mockUserRespository = new MockUserRepository();
	const tokenService = new MockTokenService();
	const emailService = new MockEmailService();
	const forgotPasswordService = new ForgotPassword(mockUserRespository, tokenService, emailService);
	const forgotPasswordController = new ForgotPasswordController(forgotPasswordService);

	test('With required parameter', async () => {
		const user = await mockUserRespository.getById('1');
		const serviceSpy = jest.spyOn(forgotPasswordService, 'exec');

		expect(
			await forgotPasswordController.handle({
				ip: '0.0.0.0',
				userId: '',
				query: null,
				cookies: null,
				headers: null,
				body: { email: user.email },
			})
		).toMatchObject(
			expect.objectContaining({
				statusCode: 200,
				body: {
					success: true,
					message: 'E-mail para alteração de senha enviado.',
					result: null,
				},
			})
		);

		expect(serviceSpy).toHaveBeenCalledTimes(1);

		serviceSpy.mockRestore();
	});

	test('Without required parameter', async () => {
		expect(
			forgotPasswordController.handle({
				ip: '0.0.0.0',
				userId: '',
				query: null,
				cookies: null,
				headers: null,
				body: null,
			})
		).resolves.toMatchObject(
			expect.objectContaining({
				statusCode: 400,
				body: {
					success: false,
					message: 'Erro ao enviar e-mail de alteração de senha.',
					result: expect.any(MissingParamError),
				},
			})
		);
	});
});
