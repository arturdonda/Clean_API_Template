import { makeActivate } from '@tests/_factories/usecases';
import { UserNotFoundError } from '@application/errors';
import { mockUserRepository } from '@tests/_factories/adapters';

describe('Activate User', () => {
	const activateService = makeActivate(mockUserRepository);

	test('Valid Confirmation Code', async () => {
		const user = await mockUserRepository.getById('1');

		if (!user) throw new UserNotFoundError();

		expect(mockUserRepository.getByConfirmationCode(user.confirmationCode)).resolves.toHaveProperty('status', 'Pending');

		expect(activateService.exec({ confirmationCode: user.confirmationCode })).resolves;

		expect(mockUserRepository.getByConfirmationCode(user.confirmationCode)).resolves.toHaveProperty('status', 'Active');
	});

	test('Invalid Confirmation Code', async () => {
		expect(activateService.exec({ confirmationCode: '123' })).rejects.toThrow("Campo 'Código de Confirmação' inválido: prefixo inválido.");
	});
});
