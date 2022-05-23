import { DatabaseError } from '@infra/errors';

describe('InvalidParamError', () => {
	const error = new DatabaseError(new Error('test'));

	it('should have correct name', () => {
		expect(error.name).toBe('DatabaseError');
	});

	it('should have standard message', () => {
		expect(error.message).toBe('Database error: test');
	});

	it('should have stack', () => {
		expect(error.stack).toEqual(expect.any(String));
	});

	it('should NOT be user error', () => {
		expect(error.userError).toBeFalsy();
	});
});
