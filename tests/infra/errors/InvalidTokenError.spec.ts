import { InvalidTokenError } from '@infra/errors';

describe('InvalidParamError', () => {
	const error = new InvalidTokenError('reason');

	it('should have correct name', () => {
		expect(error.name).toBe('InvalidTokenError');
	});

	it('should have standard message', () => {
		expect(error.message).toBe('Invalid Token: reason');
	});

	it('should have stack', () => {
		expect(error.stack).toEqual(expect.any(String));
	});

	it('should be user error', () => {
		expect(error.userError).toBeTruthy();
	});
});
