import { MockIpService, MockTokenService, MockUserRepository } from '@application/__tests__/mock';
import { CreateSession, RenewAccess, RevokeSession } from '@application/services/session';
import { ExpiredTokenError, RevokedTokenError, UserNotFoundError } from '@application/errors';
import { Geolocation, Session } from '@domain/entities';

describe('Renew Access', () => {
	const tokenService = new MockTokenService();
	const userRepository = new MockUserRepository();
	const renewAccessService = new RenewAccess(tokenService, tokenService, userRepository);
	const ipService = new MockIpService();
	const createSessionService = new CreateSession(tokenService, ipService);
	const revokeSessionService = new RevokeSession(userRepository, ipService);

	test('Valid session token', async () => {
		const user = await userRepository.getById('1');
		const session = await createSessionService.exec({ userId: '1', ipAddress: '0.0.0.0' });

		user.addSession(session);

		expect(renewAccessService.exec(session.token)).resolves;
		expect(tokenService.validate(await renewAccessService.exec(session.token)).audience).toBe(tokenService.validate(session.token).audience);
	});

	test('Invalid user', async () => {
		const sessionToken = tokenService.generate('0');

		expect(renewAccessService.exec(sessionToken.token)).rejects.toThrow(UserNotFoundError);
	});

	test('Revoked session token', async () => {
		const user = await userRepository.getById('1');
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
		const user = await userRepository.getById('1');
		const sessionToken = tokenService.generate('1', new Date(new Date().valueOf() + 1000));

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
