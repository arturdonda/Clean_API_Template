import { User, Session, Geolocation } from '@/domain/entities/classes';

describe('All valid parameters', () => {
	test('Constructor - only required fields', () => {
		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			name: 'John Doe',
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
		expect(user.name).toBe('John Doe');
		expect(user.password).toBe('Abcde#123');
		expect(user.phone).toBeNull();
		expect(user.rg).toBeNull();
		expect(user.status).toBe('Pending');
		expect(user.sessions).toHaveLength(0);
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
		expect(user.sessions).toHaveLength(0);
	});

	test('Setter - all fields', () => {
		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			name: 'John Doe',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		user.address = 'Not Found Street, 404';
		user.birthday = new Date(2000, 0, 1);
		user.cpf = '930.436.410-86';
		user.gender = 'F';
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
		expect(user.sessions).toHaveLength(0);
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
					name: 'John Doe',
					email: 'john.doe@hotmail.com',
					password: 'Abcde#123',
				})
		).toThrow("Campo 'Código de Confirmação' inválido: prefixo inválido.");
	});

	test('Invalid length', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CC',
					name: 'John Doe',
					email: 'john.doe@hotmail.com',
					password: 'Abcde#123',
				})
		).toThrow("Campo 'Código de Confirmação' inválido: deve ter mais de 2 caracteres.");
	});
});

describe('Name', () => {
	test('Invalid lenght', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'JD',
					email: 'john.doe@hotmail.com',
					password: 'Abcde#123',
				})
		).toThrow("Campo 'Nome' inválido: deve conter pelo menos 3 caracteres.");
	});
});

describe('E-mail', () => {
	test('Without @', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doehotmail.com',
					password: 'Abcde#123',
				})
		).toThrow("Campo 'E-mail' inválido: formato inválido.");
	});

	test('With double @', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doe@@hotmail.com',
					password: 'Abcde#123',
				})
		).toThrow("Campo 'E-mail' inválido: formato inválido.");
	});

	test('Without .com', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doe@hotmailcom',
					password: 'Abcde#123',
				})
		).toThrow("Campo 'E-mail' inválido: formato inválido.");
	});

	test('With tailing .', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doe@hotmail.com.',
					password: 'Abcde#123',
				})
		).toThrow("Campo 'E-mail' inválido: formato inválido.");
	});
});

describe('Password', () => {
	test('Invalid lenght', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doe@hotmail.com',
					password: 'abcde',
				})
		).toThrow("Campo 'Senha' inválido: deve conter pelo menos 8 caracteres.");
	});

	test('Without lowercase letters', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doe@hotmail.com',
					password: 'ABCDE#123',
				})
		).toThrow("Campo 'Senha' inválido: deve conter pelo menos 1 caractere minúsculo (a-z).");
	});

	test('Without uppercase letters', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doe@hotmail.com',
					password: 'abcde#123',
				})
		).toThrow("Campo 'Senha' inválido: deve conter pelo menos 1 caractere maiúsculo (A-Z).");
	});

	test('Without numbers', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doe@hotmail.com',
					password: 'Abcde#fgh',
				})
		).toThrow("Campo 'Senha' inválido: deve conter pelo menos 1 dígito (0-9).");
	});

	test('Without special characters', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doe@hotmail.com',
					password: 'Abcdef123',
				})
		).toThrow("Campo 'Senha' inválido: deve conter pelo menos 1 caractere especial (!@#$%^&*()_-+={[}]\\|:;'\",<.>/?`~ ).");
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
					name: 'John Doe',
					email: 'john.doe@hotmail.com',
					password: 'Abcde#123',
					address: 'Not',
				})
		).toThrow("Campo 'Endereço' inválido: deve conter pelo menos 5 caracteres.");
	});

	test('Setter - invalid lenght', () => {
		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			name: 'John Doe',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		expect(() => {
			user.address = 'Not';
		}).toThrow("Campo 'Endereço' inválido: deve conter pelo menos 5 caracteres.");
	});
});

describe('Birthday', () => {
	test('Constructor - prior to 01/01/1900', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doe@hotmail.com',
					password: 'Abcde#123',
					birthday: new Date(1899, 0, 1),
				})
		).toThrow("Campo 'Data de nascimento' inválido: deve ser posterior a 01/01/1900.");
	});

	test('Setter - future date', () => {
		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			name: 'John Doe',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		expect(() => {
			user.birthday = new Date(2100, 0, 1);
		}).toThrow("Campo 'Data de nascimento' inválido: não pode ser no futuro.");
	});
});

describe('CPF', () => {
	test('Constructor - invalid lenght', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doe@hotmail.com',
					password: 'Abcde#123',
					cpf: '930.436.410-8x',
				})
		).toThrow("Campo 'CPF' inválido: deve conter 11 dígitos.");
	});

	test('Setter - invalid digits', () => {
		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			name: 'John Doe',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		expect(() => {
			user.cpf = '93043641087';
		}).toThrow("Campo 'CPF' inválido: dígitos verificadores incorretos.");
	});
});

describe('Phone', () => {
	test('Constructor - invalid lenght', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doe@hotmail.com',
					password: 'Abcde#123',
					phone: '34567890',
				})
		).toThrow("Campo 'Telefone' inválido: deve conter 10 ou 11 dígitos.");
	});

	test('Setter - invalid lenght', () => {
		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			name: 'John Doe',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		expect(() => {
			user.phone = '93456-7890';
		}).toThrow("Campo 'Telefone' inválido: deve conter 10 ou 11 dígitos.");
	});
});

describe('RG', () => {
	test('Constructor - invalid character', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doe@hotmail.com',
					password: 'Abcde#123',
					rg: '30502505@',
				})
		).toThrow("Campo 'RG' inválido: formato inválido.");
	});

	test('Setter - invalid lenght', () => {
		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			name: 'John Doe',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		expect(() => {
			user.rg = '3050';
		}).toThrow("Campo 'RG' inválido: formato inválido.");
	});
});

//#endregion Optional fields

//#region Methods

describe('Session Methods', () => {
	const createSession = (refreshToken: string) =>
		new Session({
			refreshToken: refreshToken,
			expiredAt: new Date(new Date().getTime() + 86400 * 1000),
			createdBy: new Geolocation({
				ip: '0.0.0.0',
				countryName: 'Brazil',
				countryCode: 'BR',
				countryFlag: '🇧🇷',
				stateName: 'Minas Gerais',
				stateCode: 'MG',
				city: 'Uberlândia',
				latitude: -19.0233,
				longitude: -48.3348,
			}),
		});

	test('Add Session', () => {
		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			name: 'John Doe',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		expect(user.sessions).toHaveLength(0);

		user.addSession(createSession('1'));

		expect(user.sessions).toHaveLength(1);

		user.addSession(createSession('2'));
		user.addSession(createSession('3'));

		expect(user.sessions).toHaveLength(3);

		expect(user.sessions).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ refreshToken: '1' }),
				expect.objectContaining({ refreshToken: '2' }),
				expect.objectContaining({ refreshToken: '3' }),
			])
		);
	});

	test('Remove Session', () => {
		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			name: 'John Doe',
			email: 'john.doe@hotmail.com',
			password: 'Abcde#123',
		});

		user.addSession(createSession('1'));
		user.addSession(createSession('2'));
		user.addSession(createSession('3'));

		expect(user.sessions).toHaveLength(3);

		user.removeSession('2');

		expect(user.sessions).toHaveLength(2);
		expect(user.sessions).toEqual(expect.arrayContaining([expect.objectContaining({ refreshToken: '1' }), expect.objectContaining({ refreshToken: '3' })]));
	});
});

//#endregion Methods
