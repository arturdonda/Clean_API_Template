import { Geolocation } from '@/domain/entities';
import { IGeolocation } from '@/infra/adapters/db/mongoose/interfaces';

export const makeGeolocation = (dbGeolocation: IGeolocation): Geolocation => {
	return new Geolocation({
		ip: dbGeolocation.ip,
		countryName: dbGeolocation.countryName,
		countryCode: dbGeolocation.countryCode,
		countryFlag: dbGeolocation.countryFlag,
		stateName: dbGeolocation.stateName,
		stateCode: dbGeolocation.stateCode,
		city: dbGeolocation.city,
		latitude: dbGeolocation.latitude,
		longitude: dbGeolocation.longitude,
	});
};
