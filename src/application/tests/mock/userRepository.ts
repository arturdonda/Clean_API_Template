import { User } from '@/domain/entities/classes';
import { IUserRepository } from '@/application/protocols/repository';
import { UserNotFoundError } from '@/application/protocols/errors';

export class MockUserRepository implements IUserRepository {
	private _users: User[];

	constructor() {
		this._users = userDatabase;
	}

	getById = (userId: string): Promise<IUserRepository.Result | null> => {
		const user = this._users.filter(user => user.id === userId)[0];

		return new Promise((resolve, reject) => resolve(user));
	};

	getByConfirmationCode = (confirmationCode: string): Promise<IUserRepository.Result | null> => {
		const user = this._users.filter(user => user.confirmationCode === confirmationCode)[0];

		return new Promise((resolve, reject) => resolve(user));
	};

	getByEmail = (email: string): Promise<IUserRepository.Result | null> => {
		const user = this._users.filter(user => user.email === email)[0];

		return new Promise((resolve, reject) => resolve(user));
	};

	create = (user: User): Promise<IUserRepository.Result> => {
		const newUser = new User({
			id: (this._users.length + 1).toString(),
			confirmationCode: user.confirmationCode,
			name: user.name,
			email: user.email,
			password: user.password,
			address: user.address ?? undefined,
			birthday: user.birthday ?? undefined,
			cpf: user.cpf ?? undefined,
			gender: user.gender ?? undefined,
			phone: user.phone ?? undefined,
			rg: user.rg ?? undefined,
		});

		this._users.push(newUser);

		return new Promise((resolve, reject) => resolve(newUser));
	};

	update = (user: User): Promise<IUserRepository.Result> => {
		if (this._users.filter(u => u.id === user.id)[0]) throw new UserNotFoundError();

		this._users = this._users.map(u => (u.id === user.id ? user : u));

		return new Promise((resolve, reject) => resolve(user));
	};
}

const userDatabase: User[] = [
	new User({
		id: '1',
		confirmationCode: 'CCffe5c42644974f1c9102e93f35c77f64',
		name: 'Sueli Eliane Maya da Rosa',
		email: 'sueli.darosa@hotmail.com',
		password: '321@ileuS',
	}),
	new User({
		id: '2',
		confirmationCode: 'CC3e3a6b68af064012bfe514f4f46b3846',
		name: 'Sebastian Liz das Neves',
		email: 'sebastian.liz@hotmail.com',
		password: '321@naitsabeS',
	}),
	new User({
		id: '3',
		confirmationCode: 'CCa7afcc9a615c4c7583419412a19fb028',
		name: 'Larissa Cristiane Giovana Gonçalves',
		email: 'larissa.goncalves@hotmail.com',
		password: '321@assiraL',
	}),
	new User({
		id: '4',
		confirmationCode: 'CCe6a23036850140cb8ab2e49b3d8e7bab',
		name: 'Mariah Isabela Caldeira',
		email: 'mariah.caldeira@hotmail.com',
		password: '321@hairaM',
	}),
	new User({
		id: '5',
		confirmationCode: 'CC0d91e32a6c3840fa8bba086df156995c',
		name: 'Rebeca Viana',
		email: 'rebeca.viana@hotmail.com',
		password: '321@acebeR',
	}),
];
