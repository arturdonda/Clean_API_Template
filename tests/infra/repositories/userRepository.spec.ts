import { Geolocation, Session, User } from '@domain/entities';
import { IUserRepository } from '@application/protocols/repositories';
import { UserRepository } from '@infra/repositories';
import * as dtos from '@infra/adapters/db/mongoose/dtos/user';
import mongo from '@infra/adapters/db/mongoose';

describe('User Repository', () => {
	let user: User;
	let userRepository: IUserRepository;

	const mockUserSpy = jest.spyOn(dtos, 'makeUser');

	beforeAll(async () => {
		await mongo.connect(process.env.MONGO_URL);
		userRepository = new UserRepository();
	});

	beforeEach(() => jest.clearAllMocks());

	afterAll(async () => {
		await mongo.disconnect();
		jest.restoreAllMocks();
	});

	describe('Create user', () => {
		it('should create a new user', async () => {
			await expect(
				userRepository.create(
					new User({
						name: 'John Doe',
						confirmationCode: 'CC12345',
						email: 'john_doe@hotmail.com',
						password: 'John@123',
					})
				)
			).resolves.toEqual<User>(
				expect.objectContaining({
					name: 'John Doe',
					confirmationCode: 'CC12345',
					email: 'john_doe@hotmail.com',
				})
			);

			expect(mockUserSpy).toHaveBeenCalledTimes(1);
		});
	});

	describe('Get by e-mail', () => {
		it('should get user by e-mail', async () => {
			user = await userRepository.getByEmail('john_doe@hotmail.com');

			expect(user).toEqual<User>(
				expect.objectContaining({
					name: 'John Doe',
					confirmationCode: 'CC12345',
					email: 'john_doe@hotmail.com',
				})
			);

			expect(mockUserSpy).toHaveBeenCalledTimes(1);
		});

		it('should return null', async () => {
			await expect(userRepository.getByEmail('a@b.com')).resolves.toBeNull();
		});
	});

	describe('Get by id', () => {
		it('should get user by id', async () => {
			await expect(userRepository.getById(user.id)).resolves.toEqual<User>(user);

			expect(mockUserSpy).toHaveBeenCalledTimes(1);
		});

		it('should return null', async () => {
			await expect(userRepository.getById('628eb8120623c31f00d2bb3a')).resolves.toBeNull();
		});
	});

	describe('Get by confirmation code', () => {
		it('should get user by confirmation code', async () => {
			await expect(userRepository.getByConfirmationCode(user.confirmationCode)).resolves.toEqual<User>(user);

			expect(mockUserSpy).toHaveBeenCalledTimes(1);
		});

		it('should return null', async () => {
			await expect(userRepository.getByConfirmationCode('0')).resolves.toBeNull();
		});
	});

	describe('Get all users', () => {
		it('should get all users', async () => {
			await expect(userRepository.getAll()).resolves.toEqual<User[]>([user]);

			expect(mockUserSpy).toHaveBeenCalledTimes(1);
		});
	});

	describe('Update user', () => {
		it('should update user', async () => {
			user.cpf = '93043641086';
			user.rg = '30502505X';

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

			user.addSession(session);

			user = await userRepository.update(user);

			expect(user.cpf).toBe('93043641086');
			expect(user.rg).toBe('30502505X');
			expect(user.sessions).toEqual<Session[]>([session]);
			expect(mockUserSpy).toHaveBeenCalledTimes(1);
		});

		it('should update revoked session', async () => {
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

			user.revokeSession('123', geolocation);

			user = await userRepository.update(user);

			expect(user.sessions[0].revokedBy).toEqual<Geolocation>(geolocation);
			expect(mockUserSpy).toHaveBeenCalledTimes(1);
		});

		it('should return null', async () => {
			const fakeUser = new User({
				id: '628eb8120623c31f00d2bb3a',
				confirmationCode: 'CCtest',
				email: 'a@b.com',
				name: 'Update Test',
				password: 'Test@123',
			});

			await expect(userRepository.update(fakeUser)).resolves.toBeNull();
		});
	});

	describe('Get by cpf', () => {
		it('should get user by cpf', async () => {
			await expect(userRepository.getByCpf(user.cpf)).resolves.toEqual<User>(user);

			expect(mockUserSpy).toHaveBeenCalledTimes(1);
		});

		it('should return null', async () => {
			await expect(userRepository.getByCpf('12345678900')).resolves.toBeNull();
		});
	});

	describe('Get by rg', () => {
		it('should get user by rg', async () => {
			await expect(userRepository.getByRg(user.rg)).resolves.toEqual<User>(user);

			expect(mockUserSpy).toHaveBeenCalledTimes(1);
		});

		it('should return null', async () => {
			await expect(userRepository.getByRg('123456789')).resolves.toBeNull();
		});
	});
});
