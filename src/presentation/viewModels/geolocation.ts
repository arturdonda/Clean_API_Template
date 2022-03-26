import { Geolocation } from '@/domain/entities';

export class GeolocationViewModel {
	ip: string;
	countryName: string;
	countryCode: string;
	countryFlag: string;
	stateName: string;
	stateCode: string;
	city: string;
	latitude: number;
	longitude: number;

	static map(entity: Geolocation): GeolocationViewModel {
		return {
			ip: entity.ip,
			countryName: entity.countryName,
			countryCode: entity.countryCode,
			countryFlag: entity.countryFlag,
			stateName: entity.stateName,
			stateCode: entity.stateCode,
			city: entity.city,
			latitude: entity.latitude,
			longitude: entity.longitude,
		};
	}

	static mapCollection(entities: Geolocation[]): GeolocationViewModel[] {
		return entities.map(entity => GeolocationViewModel.map(entity));
	}
}
