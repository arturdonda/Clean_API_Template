import { User } from '@domain/entities';
import { UserNotFoundError } from '@application/errors';
import { getUserByIdService } from '@tests/_factories/usecases';
import { mockUserRepository } from '@tests/_factories/adapters';

describe('Get User By Id', () => {
	beforeAll(() => mockUserRepository.resetDatabase());

	afterAll(() => jest.restoreAllMocks());

	it('should validate id', async () => {
		const validationSpy = jest.spyOn(User, 'validateId');

		await getUserByIdService.exec({ userId: '1' });

		expect(validationSpy).toHaveBeenCalledTimes(1);
		expect(validationSpy).toHaveBeenCalledWith('1');
	});

	it('should validate user against database', async () => {
		expect(getUserByIdService.exec({ userId: '0' })).rejects.toThrow(UserNotFoundError);
	});

	it('should return user', async () => {
		expect(getUserByIdService.exec({ userId: '1' })).resolves.toEqual<User>(expect.objectContaining({ id: '1' }));
	});
});
