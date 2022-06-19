import { Geolocation, Session, User } from '@domain/entities';
import { makeUser } from '@infra/adapters/db/mongoose/dtos';
import * as sessionDto from '@infra/adapters/db/mongoose/dtos/session';
import { IGeolocation, IUser, ISession } from '@infra/adapters/db/mongoose/interfaces';

describe('User DTO', () => {
	const now = new Date();
	const makeSessionSpy = jest.spyOn(sessionDto, 'makeSession');

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

	const userProperties = {
		id: '123',
		address: 'Not Found Street, 404',
		birthday: new Date(2000, 0, 1),
		confirmationCode: 'CC12345',
		cpf: '93043641086',
		createDate: new Date(new Date().valueOf() - 86400 * 1000),
		email: 'john.doe@hotmail.com',
		gender: 'M',
		name: 'John Doe',
		password: 'John@123',
		phone: '1234567890',
		rg: '30502505X',
		status: 'Active',
		sessions: [sessionProperties] as ISession[],
	};

	it('should return a User', () => {
		const user = new User({ ...userProperties, gender: 'M' });
		user.status = 'Active';
		user.addSession(new Session({ ...sessionProperties, createdBy: new Geolocation(geolocationProperties) }));

		expect(makeUser(userProperties as IUser)).toEqual(user);
	});

	it('should call makeSession for each session in sessions', () => {
		expect(makeSessionSpy).toHaveBeenCalledTimes(1);
		expect(makeSessionSpy).toHaveBeenCalledWith(sessionProperties);
	});
});
