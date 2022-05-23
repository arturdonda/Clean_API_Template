import { TokenExpiredError } from '@infra/errors';

describe('InvalidParamError', () => {
	const error = new TokenExpiredError('date');

	it('should have correct name', () => {
		expect(error.name).toBe('TokenExpiredError');
	});

	it('should have standard message', () => {
		expect(error.message).toBe('Token expired at date');
	});

	it('should have stack', () => {
		expect(error.stack).toEqual(expect.any(String));
	});

	it('should be user error', () => {
		expect(error.userError).toBeTruthy();
	});
});
