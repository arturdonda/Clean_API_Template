import { UserNotFoundError } from '@application/errors';

describe('UserNotFoundError', () => {
	const error = new UserNotFoundError();

	it('should have correct name', () => {
		expect(error.name).toBe('UserNotFoundError');
	});

	it('should have standard message', () => {
		expect(error.message).toBe('Usuário não cadastrado.');
	});

	it('should have stack', () => {
		expect(error.stack).toEqual(expect.any(String));
	});

	it('should be user error', () => {
		expect(error.userError).toBeTruthy();
	});
});
