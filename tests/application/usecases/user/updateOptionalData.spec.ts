import { User } from '@domain/entities';
import { UserNotFoundError, UserRegisteredError } from '@application/errors';
import { updateOptionalDataService } from '@tests/_factories/usecases';
import { mockUserRepository } from '@tests/_factories/adapters';

describe('Update optional data', () => {
	const address = 'Not Found Street, 404';
	const birthday = new Date(2000, 0, 1);
	const gender = 'M';
	const phone = '1234567890';
	const cpf = '93043641086';
	const rg = '305025053';

	beforeAll(() => mockUserRepository.resetDatabase());

	afterAll(() => jest.restoreAllMocks());

	it('should validate id', async () => {
		const validateId = jest.spyOn(User, 'validateId');

		await updateOptionalDataService.exec({ userId: '1' });

		expect(validateId).toHaveBeenCalledTimes(1);
		expect(validateId).toHaveBeenCalledWith('1');
	});

	it('should validate user against database', async () => {
		expect(updateOptionalDataService.exec({ userId: '0' })).rejects.toThrow(UserNotFoundError);
	});

	it('should validate and update address', async () => {
		const addressValidationSpy = jest.spyOn(User, 'validateAddress');

		await updateOptionalDataService.exec({ userId: '1', address: address });

		expect(addressValidationSpy).toHaveBeenCalledWith(address);

		const user = await mockUserRepository.getById('1');

		expect(user.address).toBe(address);
	});

	it('should validate and update birthday', async () => {
		const birthdayValidationSpy = jest.spyOn(User, 'validateBirthday');

		await updateOptionalDataService.exec({ userId: '1', birthday: birthday });

		expect(birthdayValidationSpy).toHaveBeenCalledWith(birthday);

		const user = await mockUserRepository.getById('1');

		expect(user.birthday).toBe(birthday);
	});

	it('should validate and update gender', async () => {
		const genderValidationSpy = jest.spyOn(User, 'validateGender');

		await updateOptionalDataService.exec({ userId: '1', gender: gender });

		expect(genderValidationSpy).toHaveBeenCalledWith(gender);

		const user = await mockUserRepository.getById('1');

		expect(user.gender).toBe(gender);
	});

	it('should validate and update phone', async () => {
		const phoneValidationSpy = jest.spyOn(User, 'validatePhone');

		await updateOptionalDataService.exec({ userId: '1', phone: phone });

		expect(phoneValidationSpy).toHaveBeenCalledWith(phone);

		const user = await mockUserRepository.getById('1');

		expect(user.phone).toBe(phone);
	});

	it('should validate and update cpf', async () => {
		const cpfValidationSpy = jest.spyOn(User, 'validateCpf');

		await updateOptionalDataService.exec({ userId: '1', cpf: cpf });

		expect(cpfValidationSpy).toHaveBeenCalledWith(cpf);

		const user = await mockUserRepository.getById('1');

		expect(user.cpf).toBe(cpf);
	});

	it('should validate and update rg', async () => {
		const rgValidationSpy = jest.spyOn(User, 'validateRg');

		await updateOptionalDataService.exec({ userId: '1', rg: rg });

		expect(rgValidationSpy).toHaveBeenCalledWith(rg);

		const user = await mockUserRepository.getById('1');

		expect(user.rg).toBe(rg);
	});

	it('should validate if duplicated cpf', async () => {
		expect(updateOptionalDataService.exec({ userId: '2', cpf: cpf })).rejects.toThrow(UserRegisteredError);
	});

	it('should validate if duplicated rg', async () => {
		expect(updateOptionalDataService.exec({ userId: '2', rg: rg })).rejects.toThrow(UserRegisteredError);
	});
});
