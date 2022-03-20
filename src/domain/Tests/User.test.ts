import { User } from '@/domain/Classes/User';

describe('All valid parameters', () => {
	test('All valid parameters', () => {
		const user = new User({
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

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
});

//#region Required fields

describe('Confirmation Code', () => {
	test('Invalid prefix', () => {
		expect(
			() =>
				new User({
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
	test('Constructor - valid', () => {
		const user = new User({
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
			address: 'Not Found Street, 404',
		});

		expect(user.address).toBe('Not Found Street, 404');
	});

	test('Constructor - invalid', () => {
		expect(
			() =>
				new User({
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					email: 'john.doe@hotmail.com',
					password: 'Abcde#123',
					address: 'Not',
				})
		).toThrow('Endereço inválido: deve conter pelo menos 5 caracteres.');
	});

	test('Setter - valid', () => {
		const user = new User({
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		user.address = 'Not Found Street, 404';

		expect(user.address).toBe('Not Found Street, 404');
	});

	test('Setter - invalid', () => {
		const user = new User({
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
	test('Constructor - valid', () => {
		const user = new User({
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
			birthday: new Date(2000, 0, 1),
		});

		expect(user.birthday).toStrictEqual(new Date(2000, 0, 1));
	});

	test('Constructor - invalid', () => {
		expect(
			() =>
				new User({
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					email: 'john.doe@hotmail.com',
					password: 'Abcde#123',
					birthday: new Date(1899, 0, 1),
				})
		).toThrow('Data de nascimento inválido: deve ser posterior a 01/01/1900.');
	});

	test('Setter - valid', () => {
		const user = new User({
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		user.birthday = new Date(2000, 0, 1);

		expect(user.birthday).toStrictEqual(new Date(2000, 0, 1));
	});

	test('Setter - invalid', () => {
		const user = new User({
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
	test('Constructor - valid', () => {
		const user = new User({
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
			cpf: '93043641086',
		});

		expect(user.cpf).toBe('93043641086');
	});

	test('Constructor - invalid', () => {
		expect(
			() =>
				new User({
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					email: 'john.doe@hotmail.com',
					password: 'Abcde#123',
					cpf: '930.436.410-8x',
				})
		).toThrow('CPF inválido: deve conter 11 dígitos.');
	});

	test('Setter - valid', () => {
		const user = new User({
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		user.cpf = '930.436.410-86';

		expect(user.cpf).toBe('93043641086');
	});

	test('Setter - invalid', () => {
		const user = new User({
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		expect(() => {
			user.cpf = '93043641087';
		}).toThrow('CPF inválido: dígitos verificadores incorretos.');
	});
});

describe('Gender', () => {
	test('Constructor - valid', () => {
		const user = new User({
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
			gender: 'F',
		});

		expect(user.gender).toBe('F');
	});

	test('Setter - valid', () => {
		const user = new User({
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		user.gender = 'M';

		expect(user.gender).toBe('M');
	});
});

describe('Name', () => {
	test('Constructor - valid', () => {
		const user = new User({
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
			name: 'John Doe',
		});

		expect(user.name).toBe('John Doe');
	});

	test('Constructor - invalid', () => {
		expect(
			() =>
				new User({
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					email: 'john.doe@hotmail.com',
					password: 'Abcde#123',
					name: 'JD',
				})
		).toThrow('Nome inválido: deve conter pelo menos 3 caracteres.');
	});

	test('Setter - valid', () => {
		const user = new User({
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		user.name = 'John Doe';

		expect(user.name).toBe('John Doe');
	});

	test('Setter - invalid', () => {
		const user = new User({
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
	test('Constructor - valid', () => {
		const user = new User({
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
			phone: '(12) 3456-7890',
		});

		expect(user.phone).toBe('1234567890');
	});

	test('Constructor - invalid', () => {
		expect(
			() =>
				new User({
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					email: 'john.doe@hotmail.com',
					password: 'Abcde#123',
					phone: '34567890',
				})
		).toThrow('Telefone inválido: deve conter 10 ou 11 dígitos.');
	});

	test('Setter - valid', () => {
		const user = new User({
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		user.phone = '1234567890';

		expect(user.phone).toBe('1234567890');
	});

	test('Setter - invalid', () => {
		const user = new User({
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
	test('Constructor - valid', () => {
		const user = new User({
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
			rg: '30.502.505-3',
		});

		expect(user.rg).toBe('305025053');
	});

	test('Constructor - invalid', () => {
		expect(
			() =>
				new User({
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					email: 'john.doe@hotmail.com',
					password: 'Abcde#123',
					rg: '30502505@',
				})
		).toThrow('RG inválido: formato inválido.');
	});

	test('Setter - valid', () => {
		const user = new User({
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		user.rg = '30502505X';

		expect(user.rg).toBe('30502505X');
	});

	test('Setter - invalid', () => {
		const user = new User({
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		expect(() => {
			user.rg = '3050';
		}).toThrow('RG inválido: formato inválido.');
	});
});

describe('RG', () => {
	test('Setter - valid', () => {
		const user = new User({
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		user.status = 'Active';

		expect(user.status).toBe('Active');
	});
});

//#endregion Optional fields
