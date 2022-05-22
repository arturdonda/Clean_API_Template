import { Session, User } from '@domain/entities';
import { UserNotFoundError } from '@application/errors';
import { getActiveSessionsService } from '@tests/_factories/usecases';
import { mockUserRepository } from '@tests/_factories/adapters';

describe('Get Active Sessions', () => {
	beforeAll(() => mockUserRepository.resetDatabase());

	afterAll(() => jest.restoreAllMocks());

	it('should validate id', async () => {
		const validationSpy = jest.spyOn(User, 'validateId');

		await getActiveSessionsService.exec({ userId: '1' });

		expect(validationSpy).toHaveBeenCalledTimes(1);
		expect(validationSpy).toHaveBeenCalledWith('1');
	});

	it('should validate user against database', async () => {
		expect(getActiveSessionsService.exec({ userId: '0' })).rejects.toThrow(UserNotFoundError);
	});

	it('should return active sessions', async () => {
		const user = await mockUserRepository.getById('1');

		expect(getActiveSessionsService.exec({ userId: user.id })).resolves.toEqual<Session[]>(user.sessions.filter(session => session.isActive));
	});
});
