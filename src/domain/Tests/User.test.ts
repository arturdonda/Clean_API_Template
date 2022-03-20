import { User } from '@/domain/Classes/User';

describe('All valid parameters', () => {
	test('Constructor - only required fields', () => {
		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		expect(user.id).toBe('123');
		expect(user.address).toBeNull();
		expect(user.birthday).toBeNull();
		expect(user.confirmationCode).toBe('CCb192e8488dcc4d79bd58215179b9d9b3');
		expect(user.cpf).toBeNull();
		expect(user.createDate.valueOf() / 1000).toBeCloseTo(new Date().valueOf() / 1000, 0);
		expect(user.email).toBe('john.doe@hotmail.com');
		expect(user.gender).toBeNull();
		expect(user.name).toBeNull();
		expect(user.password).toBe('Abcde#123');
		expect(user.phone).toBeNull();
		expect(user.rg).toBeNull();
		expect(user.status).toBe('Pending');
	});

	test('Constructor - all fields', () => {
		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
			address: 'Not Found Street, 404',
			birthday: new Date(2000, 0, 1),
			cpf: '93043641086',
			gender: 'F',
			name: 'John Doe',
			phone: '1234567890',
			rg: '30502505X',
		});

		expect(user.id).toBe('123');
		expect(user.address).toBe('Not Found Street, 404');
		expect(user.birthday).toStrictEqual(new Date(2000, 0, 1));
		expect(user.confirmationCode).toBe('CCb192e8488dcc4d79bd58215179b9d9b3');
		expect(user.cpf).toBe('93043641086');
		expect(user.createDate.valueOf() / 1000).toBeCloseTo(new Date().valueOf() / 1000, 0);
		expect(user.email).toBe('john.doe@hotmail.com');
		expect(user.gender).toBe('F');
		expect(user.name).toBe('John Doe');
		expect(user.password).toBe('Abcde#123');
		expect(user.phone).toBe('1234567890');
		expect(user.rg).toBe('30502505X');
		expect(user.status).toBe('Pending');
	});

	test('Setter - all fields', () => {
		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		user.address = 'Not Found Street, 404';
		user.birthday = new Date(2000, 0, 1);
		user.cpf = '930.436.410-86';
		user.gender = 'F';
		user.name = 'John Doe';
		user.phone = '(12) 93456-7890';
		user.rg = '30.502.505-3';

		expect(user.id).toBe('123');
		expect(user.address).toBe('Not Found Street, 404');
		expect(user.birthday).toStrictEqual(new Date(2000, 0, 1));
		expect(user.confirmationCode).toBe('CCb192e8488dcc4d79bd58215179b9d9b3');
		expect(user.cpf).toBe('93043641086');
		expect(user.createDate.valueOf() / 1000).toBeCloseTo(new Date().valueOf() / 1000, 0);
		expect(user.email).toBe('john.doe@hotmail.com');
		expect(user.gender).toBe('F');
		expect(user.name).toBe('John Doe');
		expect(user.password).toBe('Abcde#123');
		expect(user.phone).toBe('12934567890');
		expect(user.rg).toBe('305025053');
		expect(user.status).toBe('Pending');
	});
});

//#region Required fields

describe('Confirmation Code', () => {
	test('Invalid prefix', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'b192e8488dcc4d79bd58215179b9d9b3',
					email: 'john.doe@hotmail.com',
					password: 'Abcde#123',
				})
		).toThrow('Código de Confirmação inválido: prefixo inválido.');
	});

	test('Invalid length', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CC',
					email: 'john.doe@hotmail.com',
					password: 'Abcde#123',
				})
		).toThrow('Código de Confirmação inválido: deve ter mais de 2 caracteres.');
	});
});

describe('E-mail', () => {
	test('Without @', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					email: 'john.doehotmail.com',
					password: 'Abcde#123',
				})
		).toThrow('E-mail inválido: formato inválido.');
	});

	test('With double @', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					email: 'john.doe@@hotmail.com',
					password: 'Abcde#123',
				})
		).toThrow('E-mail inválido: formato inválido.');
	});

	test('Without .com', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					email: 'john.doe@hotmailcom',
					password: 'Abcde#123',
				})
		).toThrow('E-mail inválido: formato inválido.');
	});

	test('With tailing .', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					email: 'john.doe@hotmail.com.',
					password: 'Abcde#123',
				})
		).toThrow('E-mail inválido: formato inválido.');
	});
});

describe('Password', () => {
	test('Invalid lenght', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					email: 'john.doe@hotmail.com',
					password: 'abcde',
				})
		).toThrow('Senha inválido: deve conter pelo menos 8 caracteres.');
	});

	test('Without lowercase letters', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					email: 'john.doe@hotmail.com',
					password: 'ABCDE#123',
				})
		).toThrow('Senha inválido: deve conter pelo menos 1 caractere minúsculo (a-z).');
	});

	test('Without uppercase letters', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					email: 'john.doe@hotmail.com',
					password: 'abcde#123',
				})
		).toThrow('Senha inválido: deve conter pelo menos 1 caractere maiúsculo (A-Z).');
	});

	test('Without numbers', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					email: 'john.doe@hotmail.com',
					password: 'Abcde#fgh',
				})
		).toThrow('Senha inválido: deve conter pelo menos 1 dígito (0-9).');
	});

	test('Without special characters', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					email: 'john.doe@hotmail.com',
					password: 'Abcdef123',
				})
		).toThrow('Senha inválido: deve conter pelo menos 1 caractere especial (!@#$%^&*()_-+={[}]\\|:;\'",<.>/?`~ ).');
	});
});

//#endregion Required fields

//#region Optional fields

describe('Address', () => {
	test('Constructor - invalid lenght', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					email: 'john.doe@hotmail.com',
					password: 'Abcde#123',
					address: 'Not',
				})
		).toThrow('Endereço inválido: deve conter pelo menos 5 caracteres.');
	});

	test('Setter - invalid lenght', () => {
		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		expect(() => {
			user.address = 'Not';
		}).toThrow('Endereço inválido: deve conter pelo menos 5 caracteres.');
	});
});

describe('Birthday', () => {
	test('Constructor - prior to 01/01/1900', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					email: 'john.doe@hotmail.com',
					password: 'Abcde#123',
					birthday: new Date(1899, 0, 1),
				})
		).toThrow('Data de nascimento inválido: deve ser posterior a 01/01/1900.');
	});

	test('Setter - future date', () => {
		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		expect(() => {
			user.birthday = new Date(2100, 0, 1);
		}).toThrow('Data de nascimento inválido: não pode ser no futuro.');
	});
});

describe('CPF', () => {
	test('Constructor - invalid lenght', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					email: 'john.doe@hotmail.com',
					password: 'Abcde#123',
					cpf: '930.436.410-8x',
				})
		).toThrow('CPF inválido: deve conter 11 dígitos.');
	});

	test('Setter - invalid digits', () => {
		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		expect(() => {
			user.cpf = '93043641087';
		}).toThrow('CPF inválido: dígitos verificadores incorretos.');
	});
});

describe('Name', () => {
	test('Constructor - invalid lenght', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					email: 'john.doe@hotmail.com',
					password: 'Abcde#123',
					name: 'JD',
				})
		).toThrow('Nome inválido: deve conter pelo menos 3 caracteres.');
	});

	test('Setter - invalid lenght', () => {
		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		expect(() => {
			user.name = 'JD';
		}).toThrow('Nome inválido: deve conter pelo menos 3 caracteres.');
	});
});

describe('Phone', () => {
	test('Constructor - invalid lenght', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					email: 'john.doe@hotmail.com',
					password: 'Abcde#123',
					phone: '34567890',
				})
		).toThrow('Telefone inválido: deve conter 10 ou 11 dígitos.');
	});

	test('Setter - invalid lenght', () => {
		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		expect(() => {
			user.phone = '93456-7890';
		}).toThrow('Telefone inválido: deve conter 10 ou 11 dígitos.');
	});
});

describe('RG', () => {
	test('Constructor - invalid character', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					email: 'john.doe@hotmail.com',
					password: 'Abcde#123',
					rg: '30502505@',
				})
		).toThrow('RG inválido: formato inválido.');
	});

	test('Setter - invalid lenght', () => {
		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		expect(() => {
			user.rg = '3050';
		}).toThrow('RG inválido: formato inválido.');
	});
});

//#endregion Optional fields
