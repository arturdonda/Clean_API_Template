import { MockEmailService, MockHashService, MockIpService, MockTokenService, MockUserRepository, MockUuidService } from '@application/__tests__/mock';
import { SignIn, SignUp } from '@application/services/user';
import { CreateSession, RenewAccess } from '@application/services/session';
import { InvalidPasswordError, UserAccountPendingActivation, UserNotFoundError } from '@application/errors';

describe('Sign Up', () => {
	const userRepository = new MockUserRepository();
	const uuidService = new MockUuidService();
	const passwordHashService = new MockHashService();
	const tokenService = new MockTokenService();
	const ipService = new MockIpService();
	const createSessionService = new CreateSession(tokenService, ipService);
	const renewAccessService = new RenewAccess(tokenService, tokenService, userRepository);
	const emailService = new MockEmailService();
	const signUpService = new SignUp(userRepository, uuidService, passwordHashService, emailService);
	const signInService = new SignIn(userRepository, passwordHashService, createSessionService, renewAccessService);

	test('Valid parameters', async () => {
		const emailSpy = jest.spyOn(emailService, 'sendAccountConfirmationEmail');

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

		expect(emailSpy).toHaveBeenCalledWith(expect.objectContaining({ name: 'John Doe', email: 'john.doe@hotmail.com' }));

		emailSpy.mockRestore();
	});

	test('Invalid name', async () => {
		expect(
			signUpService.exec({
				name: 'Doe',
				email: 'john.doe@hotmail.com',
				password: 'Abcde#123',
				confirmationPassword: 'Abcde#123',
			})
		).rejects.toThrow("Campo 'Nome' inválido: deve conter pelo menos 3 caracteres.");
	});

	test('Invalid e-mail', async () => {
		expect(
			signUpService.exec({
				name: 'John Doe',
				email: 'john.doehotmail.com',
				password: 'Abcde#123',
				confirmationPassword: 'Abcde#123',
			})
		).rejects.toThrow("Campo 'E-mail' inválido: formato inválido.");
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

	test('Invalid password', async () => {
		expect(
			signUpService.exec({
				name: 'John Doe',
				email: 'john.doe@hotmail.com',
				password: 'abcde#123',
				confirmationPassword: 'abcde#123',
			})
		).rejects.toThrow("Campo 'Senha' inválido: deve conter pelo menos 1 caractere maiúsculo (A-Z).");
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
