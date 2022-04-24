import { makeForgotPassword } from '@tests/_factories/usecases';
import { UserNotFoundError } from '@application/errors';
import { mockUserRepository, mockEmailService, mockTokenService } from '@tests/_factories/adapters';

describe('Forgot Password', () => {
	const forgotPasswordService = makeForgotPassword(mockUserRepository);

	test('Valid e-mail', async () => {
		const user = await mockUserRepository.getById('1');
		if (!user) throw new UserNotFoundError();

		const emailSpy = jest.spyOn(mockEmailService, 'sendForgotPasswordEmail');
		const tokenSpy = jest.spyOn(mockTokenService, 'generate');

		await forgotPasswordService.exec({ email: user.email });

		expect(tokenSpy).toHaveBeenCalledWith(user.id);
		expect(emailSpy).toHaveBeenCalledWith(expect.objectContaining({ name: user.name, email: user.email }));

		emailSpy.mockRestore();
		tokenSpy.mockRestore();
	});

	test('Nonexistent e-mail', async () => {
		expect(forgotPasswordService.exec({ email: 'john.doe@hotmail.com' })).resolves;
	});

	test('Invalid e-mail', async () => {
		expect(forgotPasswordService.exec({ email: 'john.doe@hotmailcom' })).rejects.toThrow("Campo 'E-mail' inválido: formato inválido.");
	});
});
