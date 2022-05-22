import { User } from '@domain/entities';
import { InvalidPasswordError, UserNotFoundError } from '@application/errors';
import { updatePasswordService } from '@tests/_factories/usecases';
import { mockUserRepository, mockEmailService, mockHashService } from '@tests/_factories/adapters';

describe('Update Password', () => {
	const password = 'Test@123';
	const passwordHash = mockHashService.hash(password);

	beforeAll(() => mockUserRepository.resetDatabase());

	afterAll(() => jest.restoreAllMocks());

	it('should validate id', async () => {
		const validateIdSpy = jest.spyOn(User, 'validateId');

		await updatePasswordService.exec({
			userId: '1',
			password: password,
			confirmationPassword: password,
		});

		expect(validateIdSpy).toBeCalledTimes(1);
		expect(validateIdSpy).toBeCalledWith('1');
	});

	it('should validate password', async () => {
		const validatePasswordSpy = jest.spyOn(User, 'validatePassword');

		await updatePasswordService.exec({
			userId: '1',
			password: password,
			confirmationPassword: password,
		});

		expect(validatePasswordSpy).toHaveBeenCalledTimes(1);
		expect(validatePasswordSpy).toHaveBeenCalledWith(password);
	});

	it('should validate if password matches', async () => {
		expect(
			updatePasswordService.exec({
				userId: '1',
				password: password,
				confirmationPassword: password + '4',
			})
		).rejects.toThrow(InvalidPasswordError);
	});

	it('should validate user against database', async () => {
		expect(
			updatePasswordService.exec({
				userId: '0',
				password: password,
				confirmationPassword: password,
			})
		).rejects.toThrow(UserNotFoundError);
	});

	it('should update hashed password', async () => {
		const passwordHashSpy = jest.spyOn(mockHashService, 'hash');

		await updatePasswordService.exec({
			userId: '1',
			password: password,
			confirmationPassword: password,
		});

		expect(passwordHashSpy).toHaveBeenCalledTimes(1);
		expect(passwordHashSpy).toHaveBeenCalledWith(password);

		const user = await mockUserRepository.getById('1');

		expect(user.password).toBe(passwordHash);
	});

	it('should send password change confirmation email', async () => {
		const emailSpy = jest.spyOn(mockEmailService, 'sendPasswordChangeConfirmationEmail');

		await updatePasswordService.exec({
			userId: '1',
			password: password,
			confirmationPassword: password,
		});

		const user = await mockUserRepository.getById('1');

		expect(emailSpy).toHaveBeenCalledTimes(1);
		expect(emailSpy).toHaveBeenCalledWith({
			name: user.name,
			email: user.email,
		});
	});
});
