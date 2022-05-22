import { User } from '@domain/entities';
import { forgotPasswordService } from '@tests/_factories/usecases';
import { mockUserRepository, mockEmailService, mockTokenService } from '@tests/_factories/adapters';

describe('Forgot Password', () => {
	let user: User;

	beforeAll(async () => {
		mockUserRepository.resetDatabase();
		user = await mockUserRepository.getById('1');
	});

	afterAll(() => jest.restoreAllMocks());

	it('should validate e-mail', async () => {
		const validationSpy = jest.spyOn(User, 'validateEmail');

		await forgotPasswordService.exec({ email: user.email });

		expect(validationSpy).toHaveBeenCalledTimes(1);
		expect(validationSpy).toHaveBeenCalledWith(user.email);
	});

	it('should validate user against database', async () => {
		const getByEmailSpy = jest.spyOn(mockUserRepository, 'getByEmail');

		await forgotPasswordService.exec({ email: user.email });

		expect(getByEmailSpy).toHaveBeenCalledTimes(1);
		expect(getByEmailSpy).toHaveBeenCalledWith(user.email);
	});

	it('should generate reset token', async () => {
		const resetTokenSpy = jest.spyOn(mockTokenService, 'generate');

		await forgotPasswordService.exec({ email: user.email });

		expect(resetTokenSpy).toHaveBeenCalledTimes(1);
		expect(resetTokenSpy).toHaveBeenCalledWith(user.id);
	});

	it('should send forgot password e-mail', async () => {
		const emailSpy = jest.spyOn(mockEmailService, 'sendForgotPasswordEmail');

		await forgotPasswordService.exec({ email: user.email });

		expect(emailSpy).toHaveBeenCalledTimes(1);
		expect(emailSpy).toHaveBeenCalledWith({
			name: user.name,
			email: user.email,
			resetToken: expect.any(String),
		});
	});

	it('should not generate token and send e-mail if invalid user', async () => {
		const resetTokenSpy = jest.spyOn(mockTokenService, 'generate');
		const emailSpy = jest.spyOn(mockEmailService, 'sendForgotPasswordEmail');
		resetTokenSpy.mockReset();
		emailSpy.mockReset();

		await forgotPasswordService.exec({ email: 'a@b.com' });

		expect(resetTokenSpy).toHaveBeenCalledTimes(0);
		expect(emailSpy).toHaveBeenCalledTimes(0);
	});
});
