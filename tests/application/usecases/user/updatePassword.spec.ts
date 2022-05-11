import { makeSignIn, makeUpdatePassword } from '@tests/_factories/usecases';
import { InvalidPasswordError, UserNotFoundError } from '@application/errors';
import { mockUserRepository, mockEmailService } from '@tests/_factories/adapters';

describe('Update Password', () => {
	const updatePasswordService = makeUpdatePassword(mockUserRepository);
	const signInService = makeSignIn(mockUserRepository);

	test('Valid parameters', async () => {
		const emailSpy = jest.spyOn(mockEmailService, 'sendPasswordChangeConfirmationEmail');

		const user = await mockUserRepository.getById('1');

		if (!user) throw new UserNotFoundError();

		user.status = 'Active';

		await mockUserRepository.update(user);

		expect(
			await updatePasswordService.exec({
				userId: user.id,
				password: 'Test@123',
				confirmationPassword: 'Test@123',
			})
		).resolves;

		expect(emailSpy).toHaveBeenCalledWith({ name: user.name, email: user.email });

		expect(
			signInService.exec({
				email: user.email,
				password: 'Test@123',
				ipAddress: '0.0.0.0',
			})
		).resolves;

		emailSpy.mockRestore();
	});

	test('Invalid user', async () => {
		expect(
			updatePasswordService.exec({
				userId: '',
				password: 'Test@123',
				confirmationPassword: 'Test@123',
			})
		).rejects.toThrow("Campo 'Id' inválido: não pode ser vazio.");
	});

	test('Nonexistent user', async () => {
		expect(
			updatePasswordService.exec({
				userId: '0',
				password: 'Test@123',
				confirmationPassword: 'Test@123',
			})
		).rejects.toThrow(UserNotFoundError);
	});

	test('Invalid password', async () => {
		expect(
			updatePasswordService.exec({
				userId: '1',
				password: 'TEST@123',
				confirmationPassword: 'TEST#123',
			})
		).rejects.toThrow("Campo 'Senha' inválido: deve conter pelo menos 1 caractere minúsculo (a-z).");
	});

	test('Unmatch passwords', async () => {
		expect(
			updatePasswordService.exec({
				userId: '1',
				password: 'Test@123',
				confirmationPassword: 'Test#123',
			})
		).rejects.toThrow(InvalidPasswordError);
	});
});
