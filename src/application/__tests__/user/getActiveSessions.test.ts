import { Session } from '@/domain/entities/classes';
import { MockUserRepository } from '@/application/__tests__/mock';
import { GetActiveSessions } from '@/application/services/user';
import { UserNotFoundError } from '@/application/protocols/errors';

describe('Get Active Sessions', () => {
	const userRepository = new MockUserRepository();
	const getActiveSessionsService = new GetActiveSessions(userRepository);

	test('Valid Id', () => {
		expect(getActiveSessionsService.exec({ userId: '1' })).resolves.toEqual<Session[]>([]);
	});

	test('Invalid Id', () => {
		expect(getActiveSessionsService.exec({ userId: '0' })).rejects.toThrow(UserNotFoundError);
	});
});