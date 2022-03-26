import { MockHashService, MockIpService, MockTokenService, MockUserRepository } from '@/application/__tests__/mock';
import { CreateSession, RenewAccess } from '@/application/services/session';
import { SignIn } from '@/application/services/user';
import { InvalidPasswordError, UserAccountPendingActivation, UserNotFoundError } from '@/application/protocols/errors';

describe('Sign In', () => {
	const userRepository = new MockUserRepository();
	const passwordHashService = new MockHashService();
	const tokenService = new MockTokenService();
	const ipService = new MockIpService();
	const createSessionService = new CreateSession(tokenService, ipService);
	const renewAccessService = new RenewAccess(tokenService, tokenService);
	const signInService = new SignIn(userRepository, passwordHashService, createSessionService, renewAccessService);

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
		const user = await userRepository.getByEmail('sueli.darosa@hotmail.com');

		if (!user) throw new UserNotFoundError();

		user.status = 'Active';

		userRepository.update(user);

		expect(
			await signInService.exec({
				email: 'sueli.darosa@hotmail.com',
				password: 'Sueli@123',
				ipAddress: '0.0.0.0',
			})
		).resolves;

		expect(user.sessions.length).toBe(1);
	});

	test('Invalid e-mail', async () => {
		expect(
			signInService.exec({
				email: 'sueli.darosa@hotmailcom',
				password: 'Sueli@123',
				ipAddress: '0.0.0.0',
			})
		).rejects.toThrow(UserNotFoundError);
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
