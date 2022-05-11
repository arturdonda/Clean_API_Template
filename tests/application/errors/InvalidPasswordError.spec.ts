import { InvalidPasswordError } from '@application/errors';

describe('InvalidPasswordError', () => {
	const error = new InvalidPasswordError();

	it('should have correct name', () => {
		expect(error.name).toBe('InvalidPasswordError');
	});

	it('should have standard message', () => {
		expect(error.message).toBe('Senha inválida.');
	});

	it('should have stack', () => {
		expect(error.stack).toEqual(expect.any(String));
	});

	it('should be user error', () => {
		expect(error.userError).toBeTruthy();
	});
});
