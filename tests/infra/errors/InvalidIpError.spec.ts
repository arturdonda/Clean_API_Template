import { InvalidIpError } from '@infra/errors';

describe('InvalidParamError', () => {
	const error = new InvalidIpError('0.0.0.0');

	it('should have correct name', () => {
		expect(error.name).toBe('InvalidIpError');
	});

	it('should have standard message', () => {
		expect(error.message).toBe('Invalid IP Address: 0.0.0.0');
	});

	it('should have stack', () => {
		expect(error.stack).toEqual(expect.any(String));
	});

	it('should be user error', () => {
		expect(error.userError).toBeFalsy();
	});
});
