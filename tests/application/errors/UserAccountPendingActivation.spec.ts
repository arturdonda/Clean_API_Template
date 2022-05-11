import { UserAccountPendingActivation } from '@application/errors';

describe('UserAccountPendingActivation', () => {
	const error = new UserAccountPendingActivation();

	it('should have correct name', () => {
		expect(error.name).toBe('UserAccountPendingActivation');
	});

	it('should have standard message', () => {
		expect(error.message).toBe('Conta pendente de ativação.');
	});

	it('should have stack', () => {
		expect(error.stack).toEqual(expect.any(String));
	});

	it('should be user error', () => {
		expect(error.userError).toBeTruthy();
	});
});
