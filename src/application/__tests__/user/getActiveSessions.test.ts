import { Session } from '@domain/entities';
import { MockUserRepository } from '@application/__tests__/mock';
import { GetActiveSessions } from '@application/services/user';
import { UserNotFoundError } from '@application/errors';

describe('Get Active Sessions', () => {
	const userRepository = new MockUserRepository();
	const getActiveSessionsService = new GetActiveSessions(userRepository);

	test('Valid Id', () => {
		expect(getActiveSessionsService.exec({ userId: '1' })).resolves.toEqual<Session[]>([]);
	});

	test('Nonexistent Id', () => {
		expect(getActiveSessionsService.exec({ userId: '0' })).rejects.toThrow(UserNotFoundError);
	});

	test('Invalid Id', () => {
		expect(getActiveSessionsService.exec({ userId: '' })).rejects.toThrow("Campo 'Id' inválido: não pode ser vazio.");
	});
});
