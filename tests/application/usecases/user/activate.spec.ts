import { User } from '@domain/entities';
import { UserNotFoundError } from '@application/errors';
import { activateService } from '@tests/_factories/usecases';
import { mockUserRepository } from '@tests/_factories/adapters';

describe('Activate User', () => {
	let user: User;

	beforeAll(async () => {
		mockUserRepository.resetDatabase();

		user = await mockUserRepository.getById('1');
	});

	afterAll(() => jest.restoreAllMocks());

	it('should validate confirmation code', async () => {
		const validationSpy = jest.spyOn(User, 'validateConfirmationCode');

		await activateService.exec({ confirmationCode: user.confirmationCode });

		expect(validationSpy).toHaveBeenCalledTimes(1);
		expect(validationSpy).toHaveBeenCalledWith(user.confirmationCode);
	});

	it('should validate user against database', async () => {
		expect(activateService.exec({ confirmationCode: 'CC123' })).rejects.toThrow(UserNotFoundError);
	});

	it('should update user status and persist on database', async () => {
		mockUserRepository.resetDatabase();
		const user = await mockUserRepository.getById('1');

		expect(user.status).toBe('Pending');

		await activateService.exec({ confirmationCode: user.confirmationCode });

		expect(user.status).toBe('Active');
	});
});
