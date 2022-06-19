import { Geolocation, Session } from '@domain/entities';
import { makeSession, makeSessions } from '@infra/adapters/db/mongoose/dtos';
import * as sessionDto from '@infra/adapters/db/mongoose/dtos/session';
import * as geolocationDto from '@infra/adapters/db/mongoose/dtos/geolocation';
import { IGeolocation, ISession } from '@infra/adapters/db/mongoose/interfaces';

describe('Session DTO', () => {
	const now = new Date();
	const makeSessionSpy = jest.spyOn(sessionDto, 'makeSession');
	const makeGeolocationSpy = jest.spyOn(geolocationDto, 'makeGeolocation');
	const geolocationProperties = {
		ip: '0.0.0.0',
		countryName: 'Brazil',
		countryCode: 'BR',
		countryFlag: '🇧🇷',
		stateName: 'Minas Gerais',
		stateCode: 'MG',
		city: 'Uberlândia',
		latitude: -19.0233,
		longitude: -48.3348,
	};
	const sessionProperties = {
		token: '123',
		expiredAt: new Date(now.valueOf() + 86400 * 1000),
		createdAt: now,
		createdBy: geolocationProperties as IGeolocation,
		revokedAt: null as Date,
		revokedBy: null as IGeolocation,
	};

	beforeEach(() => jest.clearAllMocks());

	it('should return a Session', () => {
		const session = makeSession(sessionProperties as ISession);

		expect(session).toEqual(
			new Session({
				...sessionProperties,
				createdBy: new Geolocation(geolocationProperties),
			})
		);
		expect(makeGeolocationSpy).toHaveBeenCalledTimes(1);
		expect(makeGeolocationSpy).toHaveBeenCalledWith(geolocationProperties);
	});

	it('should return a revoked Session', () => {
		const revokeSpy = jest.spyOn(Session.prototype, 'revoke');
		const session = makeSession({ ...sessionProperties, revokedAt: now, revokedBy: geolocationProperties } as ISession);
		const revokedSession = new Session({ ...sessionProperties, createdBy: new Geolocation(geolocationProperties) });

		revokedSession.revoke(new Geolocation(geolocationProperties), now);

		expect(session).toEqual(revokedSession);
		expect(revokeSpy).toHaveBeenCalledTimes(2);
		expect(makeGeolocationSpy).toHaveBeenCalledTimes(2);
		expect(makeGeolocationSpy).toHaveBeenCalledWith(geolocationProperties);
	});

	it('should return Session[]', () => {
		const sessions = makeSessions([sessionProperties as ISession]);

		expect(sessions).toEqual([
			new Session({
				...sessionProperties,
				createdBy: new Geolocation(geolocationProperties),
			}),
		]);

		expect(makeSessionSpy).toHaveBeenCalledTimes(1);
		expect(makeSessionSpy).toHaveBeenCalledWith(sessionProperties);
	});
});
