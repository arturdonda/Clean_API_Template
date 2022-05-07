import { SessionNotFoundError } from '@domain/errors';

describe('SessionNotFoundError', () => {
	const error = new SessionNotFoundError();

	it('should have correct name', () => {
		expect(error.name).toBe('SessionNotFoundError');
	});

	it('should have standard message', () => {
		expect(error.message).toBe('Sessão não encontrada');
	});

	it('should have stack', () => {
		expect(error.stack).toEqual(expect.any(String));
	});

	it('should be user error', () => {
		expect(error.userError).toBeTruthy();
	});
});
