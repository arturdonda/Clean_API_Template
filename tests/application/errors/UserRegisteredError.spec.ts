import { UserRegisteredError } from '@application/errors';

describe('UserRegisteredError', () => {
	const error = new UserRegisteredError('field');

	it('should have correct name', () => {
		expect(error.name).toBe('UserRegisteredError');
	});

	it('should have standard message', () => {
		expect(error.message).toBe('field já cadastrado.');
	});

	it('should have stack', () => {
		expect(error.stack).toEqual(expect.any(String));
	});

	it('should be user error', () => {
		expect(error.userError).toBeTruthy();
	});
});
