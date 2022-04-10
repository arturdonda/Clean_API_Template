import { Geolocation } from '@domain/entities';

export class GeolocationViewModel {
	private readonly ip;
	private readonly countryName;
	private readonly countryCode;
	private readonly countryFlag;
	private readonly stateName;
	private readonly stateCode;
	private readonly city;
	private readonly latitude;
	private readonly longitude;

	constructor(properties: DtoProperties) {
		this.ip = properties.ip;
		this.countryName = properties.countryName;
		this.countryCode = properties.countryCode;
		this.countryFlag = properties.countryFlag;
		this.stateName = properties.stateName;
		this.stateCode = properties.stateCode;
		this.city = properties.city;
		this.latitude = properties.latitude;
		this.longitude = properties.longitude;
	}

	static map(entity: Geolocation): GeolocationViewModel {
		return new GeolocationViewModel({
			ip: entity.ip,
			countryName: entity.countryName,
			countryCode: entity.countryCode,
			countryFlag: entity.countryFlag,
			stateName: entity.stateName,
			stateCode: entity.stateCode,
			city: entity.city,
			latitude: entity.latitude,
			longitude: entity.longitude,
		});
	}

	static mapCollection(entities: Geolocation[]): GeolocationViewModel[] {
		return entities.map(entity => GeolocationViewModel.map(entity));
	}
}

type DtoProperties = {
	ip: string;
	countryName: string;
	countryCode: string;
	countryFlag: string;
	stateName: string;
	stateCode: string;
	city: string;
	latitude: number;
	longitude: number;
};
