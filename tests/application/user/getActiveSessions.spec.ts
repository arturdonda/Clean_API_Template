import { Session } from '@domain/entities';
import { makeGetActiveSessions } from '@tests/_factories/usecases';
import { UserNotFoundError } from '@application/errors';
import { mockUserRepository } from '@tests/_factories/adapters';

describe('Get Active Sessions', () => {
	const getActiveSessionsService = makeGetActiveSessions(mockUserRepository);

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
