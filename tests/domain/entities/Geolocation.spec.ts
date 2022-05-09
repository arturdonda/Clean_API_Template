import { Geolocation } from '@domain/entities';
import { InvalidParamError } from '@domain/errors';

const validateIpAddressSpy = jest.spyOn(Geolocation, 'validateIpAddress');
const validateLatitudeSpy = jest.spyOn(Geolocation, 'validateLatitude');
const validateLongitudeSpy = jest.spyOn(Geolocation, 'validateLongitude');

describe('Getters', () => {
	it('should return all fields correctly', () => {
		const geolocation = new Geolocation({
			ip: '0.0.0.0',
			countryName: 'Brazil',
			countryCode: 'BR',
			countryFlag: '🇧🇷',
			stateName: 'Minas Gerais',
			stateCode: 'MG',
			city: 'Uberlândia',
			latitude: -19.0233,
			longitude: -48.3348,
		});

		expect(geolocation.ip).toBe('0.0.0.0');
		expect(geolocation.countryName).toBe('Brazil');
		expect(geolocation.countryCode).toBe('BR');
		expect(geolocation.countryFlag).toBe('🇧🇷');
		expect(geolocation.stateName).toBe('Minas Gerais');
		expect(geolocation.stateCode).toBe('MG');
		expect(geolocation.city).toBe('Uberlândia');
		expect(geolocation.latitude).toBe(-19.0233);
		expect(geolocation.longitude).toBe(-48.3348);
	});
});

describe('Field validation', () => {
	it('should validate fields upon creation', () => {
		new Geolocation({
			ip: '0.0.0.0',
			countryName: 'Brazil',
			countryCode: 'BR',
			countryFlag: '🇧🇷',
			stateName: 'Minas Gerais',
			stateCode: 'MG',
			city: 'Uberlândia',
			latitude: -19.0233,
			longitude: -48.3348,
		});

		expect(validateIpAddressSpy).toHaveBeenCalled();
		expect(validateLatitudeSpy).toHaveBeenCalled();
		expect(validateLongitudeSpy).toHaveBeenCalled();
	});

	it('should throw InvalidParamError - country name', () => {
		expect(
			() =>
				new Geolocation({
					ip: '0.0.0.0',
					countryName: '',
					countryCode: 'BR',
					countryFlag: '🇧🇷',
					stateName: 'Minas Gerais',
					stateCode: 'MG',
					city: 'Uberlândia',
					latitude: -19.0233,
					longitude: -48.3348,
				})
		).toThrow(InvalidParamError);
	});
	it('should throw InvalidParamError - country code', () => {
		expect(
			() =>
				new Geolocation({
					ip: '0.0.0.0',
					countryName: 'Brazil',
					countryCode: '',
					countryFlag: '🇧🇷',
					stateName: 'Minas Gerais',
					stateCode: 'MG',
					city: 'Uberlândia',
					latitude: -19.0233,
					longitude: -48.3348,
				})
		).toThrow(InvalidParamError);
	});

	it('should throw InvalidParamError - country flag', () => {
		expect(
			() =>
				new Geolocation({
					ip: '0.0.0.0',
					countryName: 'Brazil',
					countryCode: 'BR',
					countryFlag: '',
					stateName: 'Minas Gerais',
					stateCode: 'MG',
					city: 'Uberlândia',
					latitude: -19.0233,
					longitude: -48.3348,
				})
		).toThrow(InvalidParamError);
	});

	it('should throw InvalidParamError - state name', () => {
		expect(
			() =>
				new Geolocation({
					ip: '0.0.0.0',
					countryName: 'Brazil',
					countryCode: 'BR',
					countryFlag: '🇧🇷',
					stateName: '',
					stateCode: 'MG',
					city: 'Uberlândia',
					latitude: -19.0233,
					longitude: -48.3348,
				})
		).toThrow(InvalidParamError);
	});

	it('should throw InvalidParamError - state code', () => {
		expect(
			() =>
				new Geolocation({
					ip: '0.0.0.0',
					countryName: 'Brazil',
					countryCode: 'BR',
					countryFlag: '🇧🇷',
					stateName: 'Minas Gerais',
					stateCode: '',
					city: 'Uberlândia',
					latitude: -19.0233,
					longitude: -48.3348,
				})
		).toThrow(InvalidParamError);
	});

	it('should throw InvalidParamError - city', () => {
		expect(
			() =>
				new Geolocation({
					ip: '0.0.0.0',
					countryName: 'Brazil',
					countryCode: 'BR',
					countryFlag: '🇧🇷',
					stateName: 'Minas Gerais',
					stateCode: 'MG',
					city: '',
					latitude: -19.0233,
					longitude: -48.3348,
				})
		).toThrow(InvalidParamError);
	});
});

describe('Static validations', () => {
	describe('IP Address', () => {
		it('should return ip address', () => {
			expect(Geolocation.validateIpAddress('0.0.0.0')).toBe('0.0.0.0');
		});

		it('should throw InvalidParamError - over 255', () => {
			expect(() => Geolocation.validateIpAddress('0.256.0.0')).toThrow(InvalidParamError);
		});

		it('should throw InvalidParamError - invalid format', () => {
			expect(() => Geolocation.validateIpAddress('0..0.0')).toThrow(InvalidParamError);
		});

		it('should throw InvalidParamError - invalid format', () => {
			expect(() => Geolocation.validateIpAddress('0.00.0')).toThrow(InvalidParamError);
		});
	});

	describe('Latitude', () => {
		it('should return latitude', () => {
			expect(Geolocation.validateLatitude(-19.0233)).toBe(-19.0233);
		});

		it('should throw InvalidParamError - lower than -90', () => {
			expect(() => Geolocation.validateLatitude(-92)).toThrow(InvalidParamError);
		});

		it('should throw InvalidParamError - bigger than 90', () => {
			expect(() => Geolocation.validateLatitude(92)).toThrow(InvalidParamError);
		});
	});

	describe('Longitude', () => {
		it('should return longitude', () => {
			expect(Geolocation.validateLongitude(-48.3348)).toBe(-48.3348);
		});

		it('should throw InvalidParamError - lower than -180', () => {
			expect(() => Geolocation.validateLongitude(-182)).toThrow(InvalidParamError);
		});

		it('should throw InvalidParamError - bigger than 180', () => {
			expect(() => Geolocation.validateLongitude(182)).toThrow(InvalidParamError);
		});
	});
});
