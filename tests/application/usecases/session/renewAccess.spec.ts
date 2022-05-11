import { Geolocation, Session } from '@domain/entities';
import { ExpiredTokenError, RevokedTokenError, UserNotFoundError } from '@application/errors';
import { mockUserRepository, mockTokenService } from '@tests/_factories/adapters';
import { makeCreateSession, makeRenewAccess, makeRevokeSession } from '@tests/_factories/usecases';

describe('Renew Access', () => {
	const renewAccessService = makeRenewAccess(mockUserRepository);
	const createSessionService = makeCreateSession();
	const revokeSessionService = makeRevokeSession(mockUserRepository);

	it('should validate session token', async () => {
		const user = await mockUserRepository.getById('1');
		const session = await createSessionService.exec({ userId: user.id, ipAddress: '0.0.0.0' });

		const tokenServiceSpy = jest.spyOn(mockTokenService, 'validate');
		const tokenValidationSpy = jest.spyOn(Session, 'validateToken');

		user.addSession(session);

		await renewAccessService.exec(session.token);

		expect(tokenServiceSpy).toHaveBeenCalledTimes(1);
		expect(tokenValidationSpy).toHaveBeenCalledTimes(1);

		expect(tokenServiceSpy).toHaveBeenCalledWith(session.token);
		expect(tokenValidationSpy).toHaveBeenCalledWith(session.token);

		tokenServiceSpy.mockRestore();
		tokenValidationSpy.mockRestore();
	});

	it('should validate user against database', async () => {
		const session = await createSessionService.exec({ userId: '0', ipAddress: '0.0.0.0' });

		expect(renewAccessService.exec(session.token)).rejects.toThrow(UserNotFoundError);
	});

	it('should throw RevokedTokenError', async () => {
		const user = await mockUserRepository.getById('1');
		const session = await createSessionService.exec({ userId: user.id, ipAddress: '0.0.0.0' });

		user.addSession(session);

		await revokeSessionService.exec({
			userId: user.id,
			sessionToken: session.token,
			ipAddress: '0.0.0.0',
		});

		expect(renewAccessService.exec(session.token)).rejects.toThrow(RevokedTokenError);
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

		tokenServiceSpy.mockRestore();
	});
});
