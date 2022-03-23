import { MockUserRepository } from '@/application/tests/mock';
import { UpdateOptionalData } from '@/application/services/user';
import { UserNotFoundError } from '@/application/protocols/errors';

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

	test('Invalid user', async () => {
		expect(
			updateOptionalData.exec({
				userId: '0',
				address: 'Not Found Street, 404',
				birthday: new Date(2000, 0, 1),
				gender: 'F',
			})
		).rejects.toThrow(UserNotFoundError);
	});
});
