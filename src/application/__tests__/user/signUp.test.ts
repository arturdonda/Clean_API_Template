import { MockHashService, MockIpService, MockTokenService, MockUserRepository, MockUuidService } from '@/application/__tests__/mock';
import { SignIn, SignUp } from '@/application/services/user';
import { CreateSession, RenewAccess } from '@/application/services/session';
import { InvalidPasswordError, UserAccountPendingActivation, UserNotFoundError, UserRegisteredError } from '@/application/errors';

describe('Sign Up', () => {
	const userRepository = new MockUserRepository();
	const uuidService = new MockUuidService();
	const passwordHashService = new MockHashService();
	const tokenService = new MockTokenService();
	const ipService = new MockIpService();
	const createSessionService = new CreateSession(tokenService, ipService);
	const renewAccessService = new RenewAccess(tokenService, tokenService);
	const signUpService = new SignUp(userRepository, uuidService, passwordHashService);
	const signInService = new SignIn(userRepository, passwordHashService, createSessionService, renewAccessService);

	test('Valid parameters', async () => {
		expect(
			await signUpService.exec({
				name: 'John Doe',
				email: 'john.doe@hotmail.com',
				password: 'Abcde#123',
				confirmationPassword: 'Abcde#123',
			})
		).resolves;

		expect(
			signInService.exec({
				email: 'john.doe@hotmail.com',
				password: 'Abcde#123',
				ipAddress: '0.0.0.0',
			})
		).rejects.toThrow(UserAccountPendingActivation);
	});

	test('Registered e-mail', async () => {
		const user = await userRepository.getById('1');

		if (!user) throw new UserNotFoundError();

		expect(
			signUpService.exec({
				name: 'John Doe',
				email: user.email.toUpperCase(),
				password: 'Abcde#123',
				confirmationPassword: 'Abcde#123',
			})
		).rejects.toThrow('E-mail já cadastrado.');
	});

	test('Unmatch passwords', async () => {
		expect(
			signUpService.exec({
				name: 'John Doe',
				email: 'john.doe@hotmail.com',
				password: 'Abcde#123',
				confirmationPassword: 'Abcd#123',
			})
		).rejects.toThrow(InvalidPasswordError);
	});
});
