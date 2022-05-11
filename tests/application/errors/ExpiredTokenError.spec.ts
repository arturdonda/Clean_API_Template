import { ExpiredTokenError } from '@application/errors';

describe('ExpiredTokenError', () => {
	const error = new ExpiredTokenError();

	it('should have correct name', () => {
		expect(error.name).toBe('ExpiredTokenError');
	});

	it('should have standard message', () => {
		expect(error.message).toBe('Token expirado.');
	});

	it('should have stack', () => {
		expect(error.stack).toEqual(expect.any(String));
	});

	it('should be user error', () => {
		expect(error.userError).toBeTruthy();
	});
});
