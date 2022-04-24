import { makeSignIn } from '@tests/_factories/usecases';
import { InvalidPasswordError, UserAccountPendingActivation, UserNotFoundError } from '@application/errors';
import { mockUserRepository } from '@tests/_factories/adapters';

describe('Sign In', () => {
	const signInService = makeSignIn(mockUserRepository);

	test('Account Peding Activation', async () => {
		expect(
			signInService.exec({
				email: 'sueli.darosa@hotmail.com',
				password: 'Sueli@123',
				ipAddress: '0.0.0.0',
			})
		).rejects.toThrow(UserAccountPendingActivation);
	});

	test('Valid parameters', async () => {
		const user = await mockUserRepository.getByEmail('sueli.darosa@hotmail.com');

		if (!user) throw new UserNotFoundError();

		user.status = 'Active';

		mockUserRepository.update(user);

		expect(
			await signInService.exec({
				email: 'sueli.darosa@hotmail.com',
				password: 'Sueli@123',
				ipAddress: '0.0.0.0',
			})
		).resolves;

		expect(user.sessions.length).toBe(1);
	});

	test('Nonexistent e-mail', async () => {
		expect(
			signInService.exec({
				email: 'sueli@hotmail.com',
				password: 'Sueli@123',
				ipAddress: '0.0.0.0',
			})
		).rejects.toThrow(UserNotFoundError);
	});

	test('Invalid e-mail', async () => {
		expect(
			signInService.exec({
				email: 'sueli.darosa@hotmailcom',
				password: 'Sueli@123',
				ipAddress: '0.0.0.0',
			})
		).rejects.toThrow("Campo 'E-mail' inválido: formato inválido.");
	});

	test('Invalid password', async () => {
		expect(
			signInService.exec({
				email: 'sueli.darosa@hotmail.com',
				password: 'Sueli123',
				ipAddress: '0.0.0.0',
			})
		).rejects.toThrow(InvalidPasswordError);
	});
});
