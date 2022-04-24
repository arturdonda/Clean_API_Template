import { User, Session, Geolocation } from '@domain/entities';

describe('All valid parameters', () => {
	test('Constructor - only required fields', () => {
		const validPassword = User.validatePassword('Abcde#123');

		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			name: 'John Doe',
			email: 'john.doe@hotmail.com',
			password: validPassword,
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
		expect(user.password).toBe(validPassword);
		expect(user.phone).toBeNull();
		expect(user.rg).toBeNull();
		expect(user.status).toBe('Pending');
		expect(user.sessions).toHaveLength(0);
	});

	test('Constructor - all fields', () => {
		const validPassword = User.validatePassword('Abcde#123');

		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			email: 'JOHN.DOE@HOTMAIL.COM',
			password: validPassword,
			address: 'Not Found Street, 404',
			birthday: new Date(2000, 0, 1),
			cpf: '93043641086',
			createDate: new Date(new Date().valueOf() - 86400000),
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
		expect(user.createDate.valueOf() / 1000).toBeCloseTo(new Date(new Date().valueOf() - 86400000).valueOf() / 1000, 0);
		expect(user.email).toBe('john.doe@hotmail.com');
		expect(user.gender).toBe('F');
		expect(user.name).toBe('John Doe');
		expect(user.password).toBe(validPassword);
		expect(user.phone).toBe('1234567890');
		expect(user.rg).toBe('30502505X');
		expect(user.status).toBe('Pending');
		expect(user.sessions).toHaveLength(0);
	});

	test('Setter - all fields', () => {
		const validPassword = User.validatePassword('Abcde#123');

		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			name: 'John Doe',
			email: 'john.doe@hotmail.com',
			password: validPassword,
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
		expect(user.password).toBe(validPassword);
		expect(user.phone).toBe('12934567890');
		expect(user.rg).toBe('305025053');
		expect(user.status).toBe('Pending');
		expect(user.sessions).toHaveLength(0);
	});
});

//#region Required fields

describe('Confirmation Code', () => {
	const validPassword = User.validatePassword('Abcde#123');

	test('Invalid prefix', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'b192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doe@hotmail.com',
					password: validPassword,
				})
		).toThrow("Campo 'Código de Confirmação' inválido: prefixo inválido.");
	});

	test('Invalid length', () => {
		const validPassword = User.validatePassword('Abcde#123');

		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CC',
					name: 'John Doe',
					email: 'john.doe@hotmail.com',
					password: validPassword,
				})
		).toThrow("Campo 'Código de Confirmação' inválido: deve ter mais de 2 caracteres.");
	});
});

describe('Name', () => {
	const validPassword = User.validatePassword('Abcde#123');

	test('Invalid lenght', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'JD',
					email: 'john.doe@hotmail.com',
					password: validPassword,
				})
		).toThrow("Campo 'Nome' inválido: deve conter pelo menos 3 caracteres.");
	});
});

describe('E-mail', () => {
	test('Without @', () => {
		const validPassword = User.validatePassword('Abcde#123');

		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doehotmail.com',
					password: validPassword,
				})
		).toThrow("Campo 'E-mail' inválido: formato inválido.");
	});

	test('With double @', () => {
		const validPassword = User.validatePassword('Abcde#123');

		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doe@@hotmail.com',
					password: validPassword,
				})
		).toThrow("Campo 'E-mail' inválido: formato inválido.");
	});

	test('Without .com', () => {
		const validPassword = User.validatePassword('Abcde#123');

		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doe@hotmailcom',
					password: validPassword,
				})
		).toThrow("Campo 'E-mail' inválido: formato inválido.");
	});

	test('With tailing .', () => {
		const validPassword = User.validatePassword('Abcde#123');

		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doe@hotmail.com.',
					password: validPassword,
				})
		).toThrow("Campo 'E-mail' inválido: formato inválido.");
	});
});

describe('Password', () => {
	test('Invalid lenght', () => {
		expect(() => {
			const validPassword = User.validatePassword('abcde');

			new User({
				id: '123',
				confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
				name: 'John Doe',
				email: 'john.doe@hotmail.com',
				password: validPassword,
			});
		}).toThrow("Campo 'Senha' inválido: deve conter pelo menos 8 caracteres.");
	});

	test('Without lowercase letters', () => {
		expect(() => {
			const validPassword = User.validatePassword('ABCDE#123');

			new User({
				id: '123',
				confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
				name: 'John Doe',
				email: 'john.doe@hotmail.com',
				password: validPassword,
			});
		}).toThrow("Campo 'Senha' inválido: deve conter pelo menos 1 caractere minúsculo (a-z).");
	});

	test('Without uppercase letters', () => {
		expect(() => {
			const validPassword = User.validatePassword('abcde#123');

			new User({
				id: '123',
				confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
				name: 'John Doe',
				email: 'john.doe@hotmail.com',
				password: validPassword,
			});
		}).toThrow("Campo 'Senha' inválido: deve conter pelo menos 1 caractere maiúsculo (A-Z).");
	});

	test('Without numbers', () => {
		expect(() => {
			const validPassword = User.validatePassword('Abcde#fgh');

			new User({
				id: '123',
				confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
				name: 'John Doe',
				email: 'john.doe@hotmail.com',
				password: validPassword,
			});
		}).toThrow("Campo 'Senha' inválido: deve conter pelo menos 1 dígito (0-9).");
	});

	test('Without special characters', () => {
		expect(() => {
			const validPassword = User.validatePassword('Abcdef123');

			new User({
				id: '123',
				confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
				name: 'John Doe',
				email: 'john.doe@hotmail.com',
				password: validPassword,
			});
		}).toThrow("Campo 'Senha' inválido: deve conter pelo menos 1 caractere especial (!@#$%^&*()_-+={[}]\\|:;'\",<.>/?`~ ).");
	});
});

//#endregion Required fields

//#region Optional fields

describe('Address', () => {
	const validPassword = User.validatePassword('Abcde#123');

	test('Constructor - invalid lenght', () => {
		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doe@hotmail.com',
					password: validPassword,
					address: 'Not',
				})
		).toThrow("Campo 'Endereço' inválido: deve conter pelo menos 5 caracteres.");
	});

	test('Setter - invalid lenght', () => {
		const validPassword = User.validatePassword('Abcde#123');

		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			name: 'John Doe',
			email: 'john.doe@hotmail.com',
			password: validPassword,
		});

		expect(() => {
			user.address = 'Not';
		}).toThrow("Campo 'Endereço' inválido: deve conter pelo menos 5 caracteres.");
	});
});

describe('Birthday', () => {
	test('Constructor - prior to 01/01/1900', () => {
		const validPassword = User.validatePassword('Abcde#123');

		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doe@hotmail.com',
					password: validPassword,
					birthday: new Date(1899, 0, 1),
				})
		).toThrow("Campo 'Data de nascimento' inválido: deve ser posterior a 01/01/1900.");
	});

	test('Setter - future date', () => {
		const validPassword = User.validatePassword('Abcde#123');

		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			name: 'John Doe',
			email: 'john.doe@hotmail.com',
			password: validPassword,
		});

		expect(() => {
			user.birthday = new Date(2100, 0, 1);
		}).toThrow("Campo 'Data de nascimento' inválido: não pode ser no futuro.");
	});
});

describe('CPF', () => {
	test('Constructor - invalid lenght', () => {
		const validPassword = User.validatePassword('Abcde#123');

		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doe@hotmail.com',
					password: validPassword,
					cpf: '930.436.410-8x',
				})
		).toThrow("Campo 'CPF' inválido: deve conter 11 dígitos.");
	});

	test('Setter - invalid digits', () => {
		const validPassword = User.validatePassword('Abcde#123');

		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			name: 'John Doe',
			email: 'john.doe@hotmail.com',
			password: validPassword,
		});

		expect(() => {
			user.cpf = '93043641087';
		}).toThrow("Campo 'CPF' inválido: dígitos verificadores incorretos.");
	});
});

describe('Create Date', () => {
	test('Constructor - future date', () => {
		const validPassword = User.validatePassword('Abcde#123');

		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doe@hotmail.com',
					password: validPassword,
					createDate: new Date(new Date().valueOf() + 86400000),
				})
		).toThrow("Campo 'Data de criação' inválido: não pode ser no futuro.");
	});
});

describe('Phone', () => {
	test('Constructor - invalid lenght', () => {
		const validPassword = User.validatePassword('Abcde#123');

		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doe@hotmail.com',
					password: validPassword,
					phone: '34567890',
				})
		).toThrow("Campo 'Telefone' inválido: deve conter 10 ou 11 dígitos.");
	});

	test('Setter - invalid lenght', () => {
		const validPassword = User.validatePassword('Abcde#123');

		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			name: 'John Doe',
			email: 'john.doe@hotmail.com',
			password: validPassword,
		});

		expect(() => {
			user.phone = '93456-7890';
		}).toThrow("Campo 'Telefone' inválido: deve conter 10 ou 11 dígitos.");
	});
});

describe('RG', () => {
	test('Constructor - invalid character', () => {
		const validPassword = User.validatePassword('Abcde#123');

		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doe@hotmail.com',
					password: validPassword,
					rg: '30502505@',
				})
		).toThrow("Campo 'RG' inválido: formato inválido.");
	});

	test('Setter - invalid lenght', () => {
		const validPassword = User.validatePassword('Abcde#123');

		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			name: 'John Doe',
			email: 'john.doe@hotmail.com',
			password: validPassword,
		});

		expect(() => {
			user.rg = '3050';
		}).toThrow("Campo 'RG' inválido: formato inválido.");
	});
});

describe('Gender', () => {
	test('Constructor - invalid character', () => {
		const validPassword = User.validatePassword('Abcde#123');

		expect(
			() =>
				new User({
					id: '123',
					confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
					name: 'John Doe',
					email: 'john.doe@hotmail.com',
					password: validPassword,
					gender: 'X' as any,
				})
		).toThrow("Campo 'Gênero' inválido: deve ser 'M', 'F' ou 'O'.");
	});

	test('Setter - invalid lenght', () => {
		const validPassword = User.validatePassword('Abcde#123');

		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			name: 'John Doe',
			email: 'john.doe@hotmail.com',
			password: validPassword,
		});

		expect(() => {
			user.gender = '?' as any;
		}).toThrow("Campo 'Gênero' inválido: deve ser 'M', 'F' ou 'O'.");
	});
});

//#endregion Optional fields

//#region Methods

describe('Session Methods', () => {
	const createGeolocation = (ip?: string) =>
		new Geolocation({
			ip: ip ?? '0.0.0.0',
			countryName: 'Brazil',
			countryCode: 'BR',
			countryFlag: '🇧🇷',
			stateName: 'Minas Gerais',
			stateCode: 'MG',
			city: 'Uberlândia',
			latitude: -19.0233,
			longitude: -48.3348,
		});

	const createSession = (token: string, ip?: string) =>
		new Session({
			token: token,
			expiredAt: new Date(new Date().getTime() + 86400 * 1000),
			createdBy: createGeolocation(ip),
		});

	test('Get Session', () => {
		const validPassword = User.validatePassword('Abcde#123');

		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			name: 'John Doe',
			email: 'john.doe@hotmail.com',
			password: validPassword,
		});

		const session = createSession('1');

		user.addSession(session);

		expect(user.getSession('1')).toStrictEqual(session);
	});

	test('Add Session', () => {
		const validPassword = User.validatePassword('Abcde#123');

		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			name: 'John Doe',
			email: 'john.doe@hotmail.com',
			password: validPassword,
		});

		expect(user.sessions).toHaveLength(0);

		user.addSession(createSession('1'));

		expect(user.sessions).toHaveLength(1);

		user.addSession(createSession('2'));
		user.addSession(createSession('3'));

		expect(user.sessions).toHaveLength(3);

		expect(user.sessions).toEqual(
			expect.arrayContaining([expect.objectContaining({ token: '1' }), expect.objectContaining({ token: '2' }), expect.objectContaining({ token: '3' })])
		);
	});

	test('Remove Session', () => {
		const validPassword = User.validatePassword('Abcde#123');

		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			name: 'John Doe',
			email: 'john.doe@hotmail.com',
			password: validPassword,
		});

		user.addSession(createSession('1'));
		user.addSession(createSession('2'));
		user.addSession(createSession('3'));

		expect(user.sessions).toHaveLength(3);

		user.removeSession('2');

		expect(user.sessions).toHaveLength(2);
		expect(user.sessions).toEqual(expect.arrayContaining([expect.objectContaining({ token: '1' }), expect.objectContaining({ token: '3' })]));
	});

	test('Revoke Session', () => {
		const validPassword = User.validatePassword('Abcde#123');

		const user = new User({
			id: '123',
			confirmationCode: 'CCb192e8488dcc4d79bd58215179b9d9b3',
			name: 'John Doe',
			email: 'john.doe@hotmail.com',
			password: validPassword,
		});

		user.addSession(createSession('1'));
		user.addSession(createSession('2'));
		user.addSession(createSession('3'));

		const revoker = createGeolocation('0.0.0.1');
		user.revokeSession('2', revoker);

		const session = user.getSession('2');
		expect(session.revokedBy).toStrictEqual(revoker);
		expect((session.revokedAt?.valueOf() ?? 0) / 1000).toBeCloseTo(new Date().valueOf() / 1000, 0);
	});
});

//#endregion Methods
