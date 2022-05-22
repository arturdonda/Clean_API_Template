import { User, Session } from '@domain/entities';
import { InvalidPasswordError, UserAccountPendingActivation, UserNotFoundError } from '@application/errors';
import { signInService } from '@tests/_factories/usecases';
import { mockHashService, mockUserRepository } from '@tests/_factories/adapters';

describe('Sign In', () => {
	let user: User;
	let password: string;
	const ipAddress = '0.0.0.0';

	beforeAll(async () => {
		mockUserRepository.resetDatabase();

		user = await mockUserRepository.getById('1');

		user.status = 'Active';

		mockUserRepository.update(user);

		password = mockHashService.hash(user.password);
	});

	afterAll(() => jest.restoreAllMocks());

	it('should validate e-mail', async () => {
		const validationSpy = jest.spyOn(User, 'validateEmail');

		await signInService.exec({
			email: user.email,
			password: password,
			ipAddress: ipAddress,
		});

		expect(validationSpy).toHaveBeenCalledTimes(1);
		expect(validationSpy).toHaveBeenCalledWith(user.email);
	});

	it('should validate user against database', async () => {
		expect(
			signInService.exec({
				email: 'a@b.com',
				password: password,
				ipAddress: ipAddress,
			})
		).rejects.toThrow(UserNotFoundError);
	});

	it('should validate if account is pending', async () => {
		mockUserRepository.resetDatabase();

		expect(
			signInService.exec({
				email: user.email,
				password: password,
				ipAddress: ipAddress,
			})
		).rejects.toThrow(UserAccountPendingActivation);
	});

	it('should validate if password matches', async () => {
		user.status = 'Active';

		await mockUserRepository.update(user);

		expect(
			signInService.exec({
				email: user.email,
				password: '123',
				ipAddress: ipAddress,
			})
		).rejects.toThrow(InvalidPasswordError);
	});

	it('should create a session', async () => {
		const addSessionSpy = jest.spyOn(user, 'addSession');

		await signInService.exec({
			email: 'sueli.darosa@hotmail.com',
			password: 'Sueli@123',
			ipAddress: ipAddress,
		});

		expect(addSessionSpy).toHaveBeenCalledTimes(1);
		expect(addSessionSpy).toHaveBeenCalledWith(expect.any(Session));
	});

	it('should persist changes to database', async () => {
		await signInService.exec({
			email: user.email,
			password: password,
			ipAddress: ipAddress,
		});

		expect(user.sessions).not.toHaveLength(0);
	});

	it('should return user, session token and access token', async () => {
		expect(
			signInService.exec({
				email: user.email,
				password: password,
				ipAddress: ipAddress,
			})
		).resolves.toEqual({
			user: expect.any(User),
			sessionToken: expect.any(String),
			accessToken: expect.any(String),
		});
	});
});
