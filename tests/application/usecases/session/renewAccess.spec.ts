import { Geolocation, Session } from '@domain/entities';
import { ExpiredTokenError, RevokedTokenError, UserNotFoundError } from '@application/errors';
import { mockUserRepository, mockTokenService } from '@tests/_factories/adapters';
import { createSessionService, renewAccessService, revokeSessionService } from '@tests/_factories/usecases';

describe('Renew Access', () => {
	let sessionToken: string;

	beforeAll(async () => {
		mockUserRepository.resetDatabase();

		const user = await mockUserRepository.getById('1');
		const session = await createSessionService.exec({ userId: user.id, ipAddress: '0.0.0.0' });

		user.addSession(session);

		sessionToken = session.token;
	});

	afterAll(() => jest.restoreAllMocks());

	it('should validate session token', async () => {
		const tokenServiceSpy = jest.spyOn(mockTokenService, 'validate');
		const tokenValidationSpy = jest.spyOn(Session, 'validateToken');

		await renewAccessService.exec(sessionToken);

		expect(tokenServiceSpy).toHaveBeenCalledTimes(1);
		expect(tokenValidationSpy).toHaveBeenCalledTimes(1);

		expect(tokenServiceSpy).toHaveBeenCalledWith(sessionToken);
		expect(tokenValidationSpy).toHaveBeenCalledWith(sessionToken);
	});

	it('should validate user against database', async () => {
		const session = await createSessionService.exec({ userId: '0', ipAddress: '0.0.0.0' });

		expect(renewAccessService.exec(session.token)).rejects.toThrow(UserNotFoundError);
	});

	it('should throw RevokedTokenError', async () => {
		await revokeSessionService.exec({
			userId: '1',
			sessionToken: sessionToken,
			ipAddress: '0.0.0.0',
		});

		expect(renewAccessService.exec(sessionToken)).rejects.toThrow(RevokedTokenError);
	});

	it('should throw ExpiredTokenError', async () => {
		const user = await mockUserRepository.getById('1');
		const sessionToken = mockTokenService.generate(user.id, new Date(2000, 0, 1));

		user.addSession(
			new Session({
				token: sessionToken.token,
				expiredAt: sessionToken.expiredAt,
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
			})
		);

		expect(renewAccessService.exec(sessionToken.token)).rejects.toThrow(ExpiredTokenError);
	});

	it('should return a valid token for the user', async () => {
		const user = await mockUserRepository.getById('1');
		const session = await createSessionService.exec({ userId: user.id, ipAddress: '0.0.0.0' });

		const tokenServiceSpy = jest.spyOn(mockTokenService, 'generate');

		user.addSession(session);

		const accessToken = await renewAccessService.exec(session.token);

		expect(tokenServiceSpy).toHaveBeenCalledTimes(1);
		expect(tokenServiceSpy).toHaveBeenCalledWith(user.id);

		expect(mockTokenService.validate(accessToken).audience).toBe(user.id);
	});
});
