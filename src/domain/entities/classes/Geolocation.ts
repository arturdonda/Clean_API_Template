import { InvalidParamError } from '@/domain/errors';

export class Geolocation {
	private _ip: string;
	private _countryName: string;
	private _countryCode: string;
	private _countryFlag: string;
	private _stateName: string;
	private _stateCode: string;
	private _city: string;
	private _latitude: number;
	private _longitude: number;

	constructor({
		ip,
		countryName,
		countryCode,
		countryFlag,
		stateName,
		stateCode,
		city,
		latitude,
		longitude,
	}: {
		ip: string;
		countryName: string;
		countryCode: string;
		countryFlag: string;
		stateName: string;
		stateCode: string;
		city: string;
		latitude: number;
		longitude: number;
	}) {
		this._ip = Geolocation.validateIpAddress(ip);
		this._countryName = validadeStringField('Nome do país', countryName);
		this._countryCode = validadeStringField('Cód do país', countryCode);
		this._countryFlag = validadeStringField('Bandeira do país', countryFlag);
		this._stateName = validadeStringField('Nome do estado', stateName);
		this._stateCode = validadeStringField('Cód do estado', stateCode);
		this._city = validadeStringField('Cidade', city);
		this._latitude = Geolocation.validateLatitude(latitude);
		this._longitude = Geolocation.validateLongitude(longitude);
	}

	//#region Getters

	get ip() {
		return this._ip;
	}

	get countryName() {
		return this._countryName;
	}

	get countryCode() {
		return this._countryCode;
	}

	get countryFlag() {
		return this._countryFlag;
	}

	get stateName() {
		return this._stateName;
	}

	get stateCode() {
		return this._stateCode;
	}

	get city() {
		return this._city;
	}

	get latitude() {
		return this._latitude;
	}

	get longitude() {
		return this._longitude;
	}

	//#endregion Getters

	//#region Static Validations

	static validateIpAddress = (ip: string) => {
		if (!/^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/.test(ip)) throw new InvalidParamError('Endereço IP', 'formato inválido.');

		return ip;
	};

	static validateLatitude = (latitude: number) => {
		if (latitude < -90 || latitude > 90) throw new InvalidParamError('Latitude', 'range permitido é de -90 a 90.');

		return latitude;
	};

	static validateLongitude = (longitude: number) => {
		if (longitude < -180 || longitude > 180) throw new InvalidParamError('Longitude', 'range permitido é de -180 a 180.');

		return longitude;
	};

	//#endregion Static Validations
}

const validadeStringField = (fieldName: string, value: string) => {
	if (value.trim().length === 0) throw new InvalidParamError(fieldName, 'não pode ser vazio.');

	return value;
};
