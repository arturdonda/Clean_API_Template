import { User, Session, Geolocation } from '@domain/entities';
import { InvalidParamError, SessionNotFoundError } from '@domain/errors';

const idValidationSpy = jest.spyOn(User, 'validateId');
const addressValidationSpy = jest.spyOn(User, 'validateAddress');
const birthdayValidationSpy = jest.spyOn(User, 'validateBirthday');
const confirmationCodeValidationSpy = jest.spyOn(User, 'validateConfirmationCode');
const cpfValidationSpy = jest.spyOn(User, 'validateCpf');
const createDateValidationSpy = jest.spyOn(User, 'validateCreateDate');
const emailValidationSpy = jest.spyOn(User, 'validateEmail');
const genderValidationSpy = jest.spyOn(User, 'validateGender');
const nameValidationSpy = jest.spyOn(User, 'validateName');
const phoneValidationSpy = jest.spyOn(User, 'validatePhone');
const rgValidationSpy = jest.spyOn(User, 'validateRg');

beforeEach(() => jest.clearAllMocks());

describe('Getters', () => {
	it('should return all fields correctly', () => {
		const user = new User({
			id: '123',
			address: 'Not Found Street, 404',
			birthday: new Date(2000, 0, 1),
			confirmationCode: 'CC12345',
			cpf: '93043641086',
			createDate: new Date(new Date().valueOf() - 86400 * 1000),
			email: 'john.doe@hotmail.com',
			gender: 'M',
			name: 'John Doe',
			password: 'John@123',
			phone: '1234567890',
			rg: '30502505X',
		});

		expect(user.id).toBe('123');
		expect(user.address).toBe('Not Found Street, 404');
		expect(user.birthday).toEqual(new Date(2000, 0, 1));
		expect(user.confirmationCode).toBe('CC12345');
		expect(user.cpf).toBe('93043641086');
		expect(user.createDate.valueOf() / 1000).toBeCloseTo(new Date(new Date().valueOf() - 86400 * 1000).valueOf() / 1000, 0);
		expect(user.email).toBe('john.doe@hotmail.com');
		expect(user.gender).toBe('M');
		expect(user.name).toBe('John Doe');
		expect(user.password).toBe('John@123');
		expect(user.phone).toBe('1234567890');
		expect(user.rg).toBe('30502505X');
		expect(user.status).toBe('Pending');
		expect(user.sessions).toHaveLength(0);
	});
});

describe('Setters', () => {
	it('should set all fields correctly', () => {
		const user = new User({
			confirmationCode: 'CC12345',
			email: 'john.doe@hotmail.com',
			name: 'John Doe',
			password: 'John@123',
		});

		user.address = 'Not Found Street, 404';
		user.birthday = new Date(2000, 0, 1);
		user.cpf = '93043641086';
		user.email = 'john.doe@hotmail.com';
		user.gender = 'O';
		user.name = 'John Doe';
		user.password = 'John@12345';
		user.phone = '1234567890';
		user.rg = '30502505X';
		user.status = 'Active';

		expect(user.address).toBe('Not Found Street, 404');
		expect(user.birthday).toEqual(new Date(2000, 0, 1));
		expect(user.cpf).toBe('93043641086');
		expect(user.email).toBe('john.doe@hotmail.com');
		expect(user.gender).toBe('O');
		expect(user.name).toBe('John Doe');
		expect(user.password).toBe('John@12345');
		expect(user.phone).toBe('1234567890');
		expect(user.rg).toBe('30502505X');
		expect(user.status).toBe('Active');
	});

	it('should set all fields as null', () => {
		const user = new User({
			confirmationCode: 'CC12345',
			email: 'john.doe@hotmail.com',
			name: 'John Doe',
			password: 'John@123',
		});

		user.address = '';
		user.birthday = null;
		user.cpf = '';
		user.gender = null;
		user.phone = '';
		user.rg = '';

		expect(user.address).toBeNull();
		expect(user.birthday).toBeNull();
		expect(user.cpf).toBeNull();
		expect(user.gender).toBeNull();
		expect(user.phone).toBeNull();
		expect(user.rg).toBeNull();
	});
});

describe('Field validation', () => {
	it('should validade fields upon creation', () => {
		const user = new User({
			id: '123',
			address: 'Not Found Street, 404',
			birthday: new Date(2000, 0, 1),
			confirmationCode: 'CC12345',
			cpf: '93043641086',
			createDate: new Date(new Date().valueOf() - 86400000),
			email: 'john.doe@hotmail.com',
			gender: 'M',
			name: 'John Doe',
			password: 'John@123',
			phone: '1234567890',
			rg: '30502505X',
		});

		expect(idValidationSpy).toHaveBeenCalled();
		expect(addressValidationSpy).toHaveBeenCalled();
		expect(birthdayValidationSpy).toHaveBeenCalled();
		expect(confirmationCodeValidationSpy).toHaveBeenCalled();
		expect(cpfValidationSpy).toHaveBeenCalled();
		expect(createDateValidationSpy).toHaveBeenCalled();
		expect(emailValidationSpy).toHaveBeenCalled();
		expect(genderValidationSpy).toHaveBeenCalled();
		expect(nameValidationSpy).toHaveBeenCalled();
		expect(phoneValidationSpy).toHaveBeenCalled();
		expect(rgValidationSpy).toHaveBeenCalled();
	});

	it('should validade fields on update', () => {
		const user = new User({
			confirmationCode: 'CC12345',
			email: 'john.doe@hotmail.com',
			name: 'John Doe',
			password: 'John@123',
		});

		user.address = 'Not Found Street, 404';
		user.birthday = new Date();
		user.cpf = '93043641086';
		user.email = 'john.doe@hotmail.com';
		user.gender = 'M';
		user.name = 'John Doe';
		user.phone = '1234567890';
		user.rg = '30502505X';

		expect(addressValidationSpy).toHaveBeenCalled();
		expect(birthdayValidationSpy).toHaveBeenCalled();
		expect(cpfValidationSpy).toHaveBeenCalled();
		expect(emailValidationSpy).toHaveBeenCalled();
		expect(genderValidationSpy).toHaveBeenCalled();
		expect(nameValidationSpy).toHaveBeenCalled();
		expect(phoneValidationSpy).toHaveBeenCalled();
		expect(rgValidationSpy).toHaveBeenCalled();
	});
});

describe('User static validations', () => {
	describe('Id', () => {
		it('should return id', () => {
			expect(User.validateId('123')).toBe('123');
		});

		it('should throw InvalidParamError', () => {
			expect(() => User.validateId('')).toThrow(InvalidParamError);
		});
	});

	describe('Address', () => {
		it('should return address', () => {
			expect(User.validateAddress('Not Found Street, 404')).toBe('Not Found Street, 404');
		});

		it('should throw InvalidParamError', () => {
			expect(() => User.validateAddress('Not')).toThrow(InvalidParamError);
		});
	});

	describe('Birthday', () => {
		it('should return birthday', () => {
			expect(User.validateBirthday(new Date(2000, 0, 1))).toEqual(new Date(2000, 0, 1));
		});

		it('should throw InvalidParamError (prior to 1900)', () => {
			expect(() => User.validateBirthday(new Date(1899, 0, 1))).toThrow(InvalidParamError);
		});

		it('should throw InvalidParamError (in the future)', () => {
			expect(() => User.validateBirthday(new Date(new Date().valueOf() + 86400 * 1000))).toThrow(InvalidParamError);
		});
	});

	describe('Confirmation Code', () => {
		it('should return confirmation code', () => {
			expect(User.validateConfirmationCode('CC12345')).toBe('CC12345');
		});

		it('should throw InvalidParamError (invalid lenght)', () => {
			expect(() => User.validateConfirmationCode('CC')).toThrow(InvalidParamError);
		});

		it('should throw InvalidParamError (invalid prefix)', () => {
			expect(() => User.validateConfirmationCode('AA12345')).toThrow(InvalidParamError);
		});
	});

	describe('CPF', () => {
		it('should return cpf', () => {
			expect(User.validateCpf('93043641086')).toBe('93043641086');
		});

		it('should remove punctuation', () => {
			expect(User.validateCpf('930.436.410-86')).toBe('93043641086');
		});

		it('should throw InvalidParamError (invalid lenght)', () => {
			expect(() => User.validateCpf('930436410')).toThrow(InvalidParamError);
		});

		it('should throw InvalidParamError (invalid verifying digits)', () => {
			expect(() => User.validateCpf('93043641087')).toThrow(InvalidParamError);
		});
	});

	describe('Create Date', () => {
		it('should return create date', () => {
			expect(User.validateCreateDate(new Date(2000, 0, 1))).toEqual(new Date(2000, 0, 1));
		});

		it('should throw InvalidParamError (in the future)', () => {
			expect(() => User.validateCreateDate(new Date(new Date().valueOf() + 86400 * 1000))).toThrow(InvalidParamError);
		});
	});

	describe('Email', () => {
		it('should return e-mail', () => {
			expect(User.validateEmail('john.doe@hotmail.com')).toBe('john.doe@hotmail.com');
		});

		it('should transform to lower case', () => {
			expect(User.validateEmail('JOHN.DOE@HOTMAIL.COM')).toBe('john.doe@hotmail.com');
		});

		it('should throw InvalidParamError (invalid format)', () => {
			expect(() => User.validateEmail('john.doehotmail.com')).toThrow(InvalidParamError);
		});

		it('should throw InvalidParamError (invalid format)', () => {
			expect(() => User.validateEmail('john.doe@hotmailcom')).toThrow(InvalidParamError);
		});
	});

	describe('Name', () => {
		it('should return name', () => {
			expect(User.validateName('John Doe')).toBe('John Doe');
		});

		it('should throw InvalidParamError (invalid lenght)', () => {
			expect(() => User.validateName('Doe')).toThrow(InvalidParamError);
		});
	});

	describe('Password', () => {
		it('should return password', () => {
			expect(User.validatePassword('John@123')).toBe('John@123');
		});

		it('should throw InvalidParamError (invalid lenght)', () => {
			expect(() => User.validatePassword('John@1')).toThrow(InvalidParamError);
		});

		it('should throw InvalidParamError (should have at least 1 lowercase character)', () => {
			expect(() => User.validatePassword('JOHN@123')).toThrow(InvalidParamError);
		});

		it('should throw InvalidParamError (should have at least 1 uppercase character)', () => {
			expect(() => User.validatePassword('john@123')).toThrow(InvalidParamError);
		});

		it('should throw InvalidParamError (should have at least 1 digit)', () => {
			expect(() => User.validatePassword('John@Doe')).toThrow(InvalidParamError);
		});

		it('should throw InvalidParamError (should have at least 1 special character)', () => {
			expect(() => User.validatePassword('John1234')).toThrow(InvalidParamError);
		});
	});

	describe('Phone', () => {
		it('should return phone', () => {
			expect(User.validatePhone('1234567890')).toBe('1234567890');
		});

		it('should remove punctuation', () => {
			expect(User.validatePhone('(12) 3456-7890')).toBe('1234567890');
		});

		it('should throw InvalidParamError (invalid lenght)', () => {
			expect(() => User.validatePhone('(12) 3456-789')).toThrow(InvalidParamError);
		});
	});

	describe('RG', () => {
		it('should return rg', () => {
			expect(User.validateRg('30502505X')).toBe('30502505X');
		});

		it('should remove punctuation', () => {
			expect(User.validateRg('30.502.505-X')).toBe('30502505X');
		});

		it('should throw InvalidParamError (invalid format)', () => {
			expect(() => User.validateRg('3050')).toThrow(InvalidParamError);
		});
	});

	describe('Gender', () => {
		it('should return gender', () => {
			expect(User.validateGender('M')).toBe('M');
			expect(User.validateGender('F')).toBe('F');
			expect(User.validateGender('O')).toBe('O');
		});

		it('should throw InvalidParamError (invalid gender)', () => {
			expect(() => User.validateGender('X')).toThrow(InvalidParamError);
		});
	});
});

describe('User methods', () => {
	const user = new User({
		confirmationCode: 'CC12345',
		email: 'john.doe@hotmail.com',
		name: 'John Doe',
		password: 'John@123',
	});

	const geolocation = new Geolocation({
		ip: '0.0.0.0',
		countryName: 'Brazil',
		countryCode: 'BR',
		countryFlag: '🇧🇷',
		stateName: 'Minas Gerais',
		stateCode: 'MG',
		city: 'Uberlândia',
		latitude: -19.0233,
		longitude: -48.3348,
	});

	const session = new Session({
		token: '123',
		createdBy: geolocation,
		expiredAt: new Date(new Date().valueOf() + 86400 * 1000),
	});

	it('should add a new session', () => {
		user.addSession(session);

		expect(user.sessions.length).toBe(1);
	});

	it('should retrieve session', () => {
		expect(user.getSession(session.token)).toEqual(session);
	});

	it('should revoke session', () => {
		user.revokeSession(session.token, geolocation);

		expect(user.getSession(session.token).revokedAt.valueOf()).toBeCloseTo(new Date().valueOf());
		expect(user.getSession(session.token).revokedBy).toEqual(geolocation);
	});

	it('should throw SessionNotFoundError', () => {
		expect(() => user.revokeSession('12345', geolocation)).toThrow(SessionNotFoundError);
	});

	it('should remove session', () => {
		user.removeSession(session.token);

		expect(user.sessions.length).toBe(0);
	});
});
