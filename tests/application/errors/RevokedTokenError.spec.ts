import { RevokedTokenError } from '@application/errors';

describe('RevokedTokenError', () => {
	const error = new RevokedTokenError();

	it('should have correct name', () => {
		expect(error.name).toBe('RevokedTokenError');
	});

	it('should have standard message', () => {
		expect(error.message).toBe('Token revogado.');
	});

	it('should have stack', () => {
		expect(error.stack).toEqual(expect.any(String));
	});

	it('should be user error', () => {
		expect(error.userError).toBeTruthy();
	});
});
