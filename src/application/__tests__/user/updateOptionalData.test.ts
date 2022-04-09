import { MockUserRepository } from '@application/__tests__/mock';
import { UpdateOptionalData } from '@application/services/user';
import { UserNotFoundError } from '@application/errors';

describe('Update optional data', () => {
	const userRepository = new MockUserRepository();
	const updateOptionalData = new UpdateOptionalData(userRepository);

	test('Valid - all parameters', async () => {
		expect(
			await updateOptionalData.exec({
				userId: '1',
				address: 'Not Found Street, 404',
				birthday: new Date(2000, 0, 1),
				cpf: '930.436.410-86',
				gender: 'F',
				phone: '(12) 93456-7890',
				rg: '30.502.505-3',
			})
		).resolves;

		const user = await userRepository.getById('1');

		if (!user) throw new UserNotFoundError();

		expect(user.address).toBe('Not Found Street, 404');
		expect(user.birthday).toStrictEqual(new Date(2000, 0, 1));
		expect(user.cpf).toBe('93043641086');
		expect(user.gender).toBe('F');
		expect(user.phone).toBe('12934567890');
		expect(user.rg).toBe('305025053');
	});

	test('Valid - some parameters', async () => {
		expect(
			await updateOptionalData.exec({
				userId: '2',
				address: 'Not Found Street, 404',
				birthday: new Date(2000, 0, 1),
				gender: 'F',
			})
		).resolves;

		const user = await userRepository.getById('2');

		if (!user) throw new UserNotFoundError();

		expect(user.address).toBe('Not Found Street, 404');
		expect(user.birthday).toStrictEqual(new Date(2000, 0, 1));
		expect(user.cpf).toBeNull();
		expect(user.gender).toBe('F');
		expect(user.phone).toBeNull();
		expect(user.rg).toBeNull();
	});

	test('Nonexistent user', async () => {
		expect(
			updateOptionalData.exec({
				userId: '0',
				address: 'Not Found Street, 404',
				birthday: new Date(2000, 0, 1),
				gender: 'F',
			})
		).rejects.toThrow(UserNotFoundError);
	});

	test('Duplicated cpf', async () => {
		expect(
			updateOptionalData.exec({
				userId: '3',
				cpf: '930.436.410-86',
			})
		).rejects.toThrow('CPF já cadastrado.');
	});

	test('Duplicated rg', async () => {
		expect(
			updateOptionalData.exec({
				userId: '3',
				rg: '30.502.505-3',
			})
		).rejects.toThrow('RG já cadastrado.');
	});

	test('Invalid Id', async () => {
		expect(
			updateOptionalData.exec({
				userId: '',
				rg: '30.502.505-3',
			})
		).rejects.toThrow("Campo 'Id' inválido: não pode ser vazio.");
	});

	test('Invalid Address', async () => {
		expect(
			updateOptionalData.exec({
				userId: '3',
				address: 'Rua',
			})
		).rejects.toThrow("Campo 'Endereço' inválido: deve conter pelo menos 5 caracteres.");
	});

	test('Invalid Birthday - Before 1900', async () => {
		expect(
			updateOptionalData.exec({
				userId: '3',
				birthday: new Date(1899, 0, 1),
			})
		).rejects.toThrow("Campo 'Data de nascimento' inválido: deve ser posterior a 01/01/1900.");
	});

	test('Invalid Birthday - Future', async () => {
		expect(
			updateOptionalData.exec({
				userId: '3',
				birthday: new Date(new Date().valueOf() + 86400 * 1000),
			})
		).rejects.toThrow("Campo 'Data de nascimento' inválido: não pode ser no futuro.");
	});

	test('Invalid Gender', async () => {
		expect(
			updateOptionalData.exec({
				userId: '3',
				gender: 'X',
			})
		).rejects.toThrow("Campo 'Gênero' inválido: deve ser 'M', 'F' ou 'O'.");
	});

	test('Invalid Phone', async () => {
		expect(
			updateOptionalData.exec({
				userId: '3',
				phone: '12345678',
			})
		).rejects.toThrow("Campo 'Telefone' inválido: deve conter 10 ou 11 dígitos.");
	});

	test('Invalid CPF - Lenght', async () => {
		expect(
			updateOptionalData.exec({
				userId: '3',
				cpf: '123',
			})
		).rejects.toThrow("Campo 'CPF' inválido: deve conter 11 dígitos.");
	});

	test('Invalid CPF - Incorrect', async () => {
		expect(
			updateOptionalData.exec({
				userId: '3',
				cpf: '123.456.789-10',
			})
		).rejects.toThrow("Campo 'CPF' inválido: dígitos verificadores incorretos.");
	});

	test('Invalid RG', async () => {
		expect(
			updateOptionalData.exec({
				userId: '3',
				rg: '123',
			})
		).rejects.toThrow("Campo 'RG' inválido: formato inválido.");
	});
});
