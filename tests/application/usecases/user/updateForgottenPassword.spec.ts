import { updateForgottenPasswordService, updatePasswordService } from '@tests/_factories/usecases';
import { mockUserRepository, mockTokenService } from '@tests/_factories/adapters';

describe('Update forgotten password', () => {
	const { token: resetToken } = mockTokenService.generate('1');
	const password = 'Test@123';

	beforeAll(() => mockUserRepository.resetDatabase());

	afterAll(() => jest.restoreAllMocks());

	it('should validate reset token', async () => {
		const resetTokenSpy = jest.spyOn(mockTokenService, 'validate');

		await updateForgottenPasswordService.exec({
			resetToken: resetToken,
			password: password,
			confirmationPassword: password,
		});

		expect(resetTokenSpy).toHaveBeenCalledTimes(1);
		expect(resetTokenSpy).toHaveBeenCalledWith(resetToken);
	});

	it('should call update password service', async () => {
		const updatePasswordSpy = jest.spyOn(updatePasswordService, 'exec');

		await updateForgottenPasswordService.exec({
			resetToken: resetToken,
			password: password,
			confirmationPassword: password,
		});

		expect(updatePasswordSpy).toHaveBeenCalledTimes(1);
		expect(updatePasswordSpy).toHaveBeenCalledWith({
			userId: '1',
			password: password,
			confirmationPassword: password,
		});
	});
});
