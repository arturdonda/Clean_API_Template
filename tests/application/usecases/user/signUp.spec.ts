import { User } from '@domain/entities';
import { InvalidPasswordError, UserRegisteredError } from '@application/errors';
import { signUpService } from '@tests/_factories/usecases';
import { mockUserRepository, mockEmailService, mockHashService } from '@tests/_factories/adapters';

describe('Sign Up', () => {
	const name = 'John Doe';
	const email = 'john.doe@hotmail.com';
	const password = 'John@123';
	const passwordHash = mockHashService.hash(password);

	beforeAll(() => mockUserRepository.resetDatabase());

	afterAll(() => jest.restoreAllMocks());

	it('should validate name', async () => {
		const nameValidationSpy = jest.spyOn(User, 'validateName');

		expect(
			signUpService.exec({
				name: name,
				email: email,
				password: password,
				confirmationPassword: password,
			})
		);

		expect(nameValidationSpy).toBeCalledTimes(1);
		expect(nameValidationSpy).toBeCalledWith(name);
	});

	it('should validate e-mail', async () => {
		mockUserRepository.resetDatabase();

		const emailValidationSpy = jest.spyOn(User, 'validateEmail');

		expect(
			signUpService.exec({
				name: name,
				email: email,
				password: password,
				confirmationPassword: password,
			})
		);

		expect(emailValidationSpy).toBeCalledTimes(1);
		expect(emailValidationSpy).toBeCalledWith(email);
	});

	it('should validate password', async () => {
		mockUserRepository.resetDatabase();

		const passwordValidationSpy = jest.spyOn(User, 'validatePassword');

		expect(
			signUpService.exec({
				name: name,
				email: email,
				password: password,
				confirmationPassword: password,
			})
		);

		expect(passwordValidationSpy).toBeCalledTimes(1);
		expect(passwordValidationSpy).toBeCalledWith(password);
	});

	it('should validate if password matches', async () => {
		expect(
			signUpService.exec({
				name: name,
				email: email,
				password: password,
				confirmationPassword: '123',
			})
		).rejects.toThrow(InvalidPasswordError);
	});

	it('should validate if user exists', async () => {
		expect(
			signUpService.exec({
				name: name,
				email: email,
				password: password,
				confirmationPassword: password,
			})
		).rejects.toThrow(UserRegisteredError);
	});

	it('should send account confirmation email', async () => {
		mockUserRepository.resetDatabase();

		const emailSpy = jest.spyOn(mockEmailService, 'sendAccountConfirmationEmail');

		await signUpService.exec({
			name: name,
			email: email,
			password: password,
			confirmationPassword: password,
		});

		expect(emailSpy).toHaveBeenCalledTimes(1);
		expect(emailSpy).toHaveBeenCalledWith({
			name: name,
			email: email,
			confirmationCode: expect.any(String),
		});
	});

	it('should return created user', async () => {
		mockUserRepository.resetDatabase();

		expect(
			signUpService.exec({
				name: name,
				email: email,
				password: password,
				confirmationPassword: password,
			})
		).resolves.toEqual<User>(
			expect.objectContaining({
				name: name,
				email: email,
				password: passwordHash,
			})
		);
	});
});
