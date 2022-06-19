import { Geolocation } from '@domain/entities';
import { makeGeolocation } from '@infra/adapters/db/mongoose/dtos';
import { IGeolocation } from '@infra/adapters/db/mongoose/interfaces';

describe('Geolocation DTO', () => {
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

	it('should return a Geolocation', () => {
		expect(makeGeolocation(geolocationProperties as IGeolocation)).toEqual(new Geolocation(geolocationProperties));
	});
});
