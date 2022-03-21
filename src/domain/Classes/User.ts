import { ACCOUNT_STATUS, GENDER } from '@/domain/Constants';
import { InvalidParamError } from '@/domain/Errors';
import { Session } from '@/domain/Classes';

export class User {
	private _id: string;
	private _address: string | null;
	private _birthday: Date | null;
	private _confirmationCode: string;
	private _cpf: string | null;
	private _createDate: Date;
	private _email: string;
	private _gender: GENDER | null;
	private _name: string | null;
	private _password: string;
	private _phone: string | null;
	private _rg: string | null;
	private _status: ACCOUNT_STATUS;
	private _sessions: Session[];

	constructor({
		id,
		address,
		birthday,
		confirmationCode,
		cpf,
		email,
		gender,
		name,
		password,
		phone,
		rg,
	}: {
		id: string;
		address?: string;
		birthday?: Date;
		confirmationCode: string;
		cpf?: string;
		email: string;
		gender?: GENDER;
		name?: string;
		password: string;
		phone?: string;
		rg?: string;
	}) {
		this._id = User.validadeId(id);
		this._address = address ? User.validateAddress(address) : null;
		this._birthday = birthday ? User.validateBirthday(birthday) : null;
		this._confirmationCode = User.validateConfirmationCode(confirmationCode);
		this._cpf = cpf ? User.validateCpf(cpf) : null;
		this._createDate = new Date();
		this._email = User.validateEmail(email);
		this._gender = gender ?? null;
		this._name = name ? User.validateName(name) : null;
		this._password = User.validatePassword(password);
		this._phone = phone ? User.validatePhone(phone) : null;
		this._rg = rg ? User.validateRg(rg) : null;
		this._status = 'Pending';
		this._sessions = [];
	}

	//#region Getters

	get id() {
		return this._id;
	}

	get address() {
		return this._address;
	}

	get birthday() {
		return this._birthday;
	}

	get confirmationCode() {
		return this._confirmationCode;
	}

	get cpf() {
		return this._cpf;
	}

	get createDate() {
		return this._createDate;
	}

	get email() {
		return this._email;
	}

	get gender() {
		return this._gender;
	}

	get name() {
		return this._name;
	}

	get password() {
		return this._password;
	}

	get phone() {
		return this._phone;
	}

	get rg() {
		return this._rg;
	}

	get status() {
		return this._status;
	}

	get sessions() {
		return this._sessions.filter(session => session.isActive);
	}

	//#endregion Getters

	//#region Setters

	set address(address) {
		this._address = address ? User.validateAddress(address) : null;
	}

	set birthday(birthday) {
		this._birthday = birthday ? User.validateBirthday(birthday) : null;
	}

	set cpf(cpf) {
		this._cpf = cpf ? User.validateCpf(cpf) : null;
	}

	set email(email) {
		this._email = User.validateEmail(email);
	}

	set gender(gender) {
		this._gender = gender ?? null;
	}

	set name(name) {
		this._name = name ? User.validateName(name) : null;
	}

	set password(password) {
		this._password = User.validatePassword(password);
	}

	set phone(phone) {
		this._phone = phone ? User.validatePhone(phone) : null;
	}

	set rg(rg) {
		this._rg = rg ? User.validateRg(rg) : null;
	}

	set status(status) {
		this._status = status;
	}

	//#endregion Setters

	//#region Methods

	addSession(session: Session) {
		this._sessions.push(session);
	}

	removeSession(refreshToken: string) {
		this._sessions = this._sessions.filter(session => session.refreshToken !== refreshToken);
	}

	//#endregion Methods

	//#region Static Validations

	static validadeId = (id: string) => {
		if (id.trim().length === 0) throw new InvalidParamError('Id', 'não pode ser vazio.');
		return id;
	};

	static validateAddress = (address: string) => {
		if (address.length < 5) throw new InvalidParamError('Endereço', 'deve conter pelo menos 5 caracteres.');

		return address;
	};

	static validateBirthday = (birthday: Date) => {
		if (birthday.getFullYear() < 1900) throw new InvalidParamError('Data de nascimento', 'deve ser posterior a 01/01/1900.');
		if (birthday > new Date()) throw new InvalidParamError('Data de nascimento', 'não pode ser no futuro.');

		return birthday;
	};

	static validateConfirmationCode = (confirmationCode: string) => {
		if (confirmationCode.length <= 2) throw new InvalidParamError('Código de Confirmação', 'deve ter mais de 2 caracteres.');
		if (!confirmationCode.startsWith('CC')) throw new InvalidParamError('Código de Confirmação', 'prefixo inválido.');

		return confirmationCode;
	};

	static validateCpf = (cpf: string) => {
		cpf = cpf.replace(/\D/g, '');

		if (cpf.length !== 11) throw new InvalidParamError('CPF', 'deve conter 11 dígitos.');

		let digits = cpf.split('').map(x => parseInt(x));
		let firstDigit = (digits.reduce((total, digit, index) => (index < 9 ? total + digit * (10 - index) : total), 0) * 10) % 11;
		let secondDigit = ((digits.reduce((total, digit, index) => (index < 9 ? total + digit * (11 - index) : total), 0) + firstDigit * 2) * 10) % 11;

		if (firstDigit !== digits[9] || secondDigit !== digits[10]) throw new InvalidParamError('CPF', 'dígitos verificadores incorretos.');

		return cpf;
	};

	static validateEmail = (email: string) => {
		const emailRegexValidator =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!emailRegexValidator.test(email)) throw new InvalidParamError('E-mail', 'formato inválido.');

		return email;
	};

	static validateName = (name: string) => {
		if (name.trim().length <= 3) throw new InvalidParamError('Nome', 'deve conter pelo menos 3 caracteres.');

		return name;
	};

	static validatePassword = (password: string) => {
		if (password.length < 8) throw new InvalidParamError('Senha', 'deve conter pelo menos 8 caracteres.');
		if (!/^(?=.*[a-z]).*$/.test(password)) throw new InvalidParamError('Senha', 'deve conter pelo menos 1 caractere minúsculo (a-z).');
		if (!/^(?=.*[A-Z]).*$/.test(password)) throw new InvalidParamError('Senha', 'deve conter pelo menos 1 caractere maiúsculo (A-Z).');
		if (!/^(?=.*[0-9]).*$/.test(password)) throw new InvalidParamError('Senha', 'deve conter pelo menos 1 dígito (0-9).');
		if (!/^(?=.*[!@#$%^&*()_\-+={[}\]\\|:;'",<.>\/?`~ ]).*$/.test(password))
			throw new InvalidParamError('Senha', 'deve conter pelo menos 1 caractere especial (!@#$%^&*()_-+={[}]\\|:;\'",<.>/?`~ ).');

		return password;
	};

	static validatePhone = (phone: string) => {
		phone = phone.replace(/\D/g, '');

		if (!/^[0-9]{10,11}$/.test(phone)) throw new InvalidParamError('Telefone', 'deve conter 10 ou 11 dígitos.');

		return phone;
	};

	static validateRg = (rg: string) => {
		rg = rg.replace(/[.-]/g, '');

		if (!/^[a-zA-Z0-9]{5,}$/.test(rg)) throw new InvalidParamError('RG', 'formato inválido.');

		return rg;
	};

	//#endregion Static Validations
}
