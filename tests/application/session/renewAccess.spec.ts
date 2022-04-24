import { Geolocation, Session } from '@domain/entities';
import { makeCreateSession, makeRenewAccess, makeRevokeSession } from '@tests/_factories/usecases';
import { ExpiredTokenError, RevokedTokenError, UserNotFoundError } from '@application/errors';
import { mockUserRepository, mockTokenService } from '@tests/_factories/adapters';

describe('Renew Access', () => {
	const renewAccessService = makeRenewAccess(mockUserRepository);
	const createSessionService = makeCreateSession();
	const revokeSessionService = makeRevokeSession(mockUserRepository);

	test('Valid session token', async () => {
		const user = await mockUserRepository.getById('1');
		const session = await createSessionService.exec({ userId: '1', ipAddress: '0.0.0.0' });

		user.addSession(session);

		expect(renewAccessService.exec(session.token)).resolves;
		expect(mockTokenService.validate(await renewAccessService.exec(session.token)).audience).toBe(mockTokenService.validate(session.token).audience);
	});

	test('Invalid user', async () => {
		const sessionToken = mockTokenService.generate('0');

		expect(renewAccessService.exec(sessionToken.token)).rejects.toThrow(UserNotFoundError);
	});

	test('Revoked session token', async () => {
		const user = await mockUserRepository.getById('1');
		const session = await createSessionService.exec({ userId: '1', ipAddress: '0.0.0.0' });

		user.addSession(session);

		await revokeSessionService.exec({
			userId: user.id,
			sessionToken: session.token,
			ipAddress: '0.0.0.0',
		});

		expect(renewAccessService.exec(session.token)).rejects.toThrow(RevokedTokenError);
	});

	test('Expired session token', async () => {
		const user = await mockUserRepository.getById('1');
		const sessionToken = mockTokenService.generate('1', new Date(new Date().valueOf() + 1000));

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

		await new Promise<void>((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, 1000);
		});

		expect(renewAccessService.exec(sessionToken.token)).rejects.toThrow(ExpiredTokenError);
	});
});
