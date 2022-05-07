import { InvalidParamError } from '@domain/errors';

describe('InvalidParamError', () => {
	const error = new InvalidParamError('field', 'reason');

	it('should have correct name', () => {
		expect(error.name).toBe('InvalidParamError');
	});

	it('should have standard message', () => {
		expect(error.message).toBe("Campo 'field' inválido: reason");
	});

	it('should have stack', () => {
		expect(error.stack).toEqual(expect.any(String));
	});

	it('should be user error', () => {
		expect(error.userError).toBeTruthy();
	});
});
