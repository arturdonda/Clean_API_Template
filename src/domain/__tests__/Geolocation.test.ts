import { Geolocation } from '@/domain/entities';

describe('All valid parameters', () => {
	test('All valid parameters', () => {
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

describe('IP Address', () => {
	test('Over 255', () => {
		expect(
			() =>
				new Geolocation({
					ip: '0.0.256.0',
					countryName: 'Brazil',
					countryCode: 'BR',
					countryFlag: '🇧🇷',
					stateName: 'Minas Gerais',
					stateCode: 'MG',
					city: 'Uberlândia',
					latitude: -19.0233,
					longitude: -48.3348,
				})
		).toThrow("Campo 'Endereço IP' inválido: formato inválido.");
	});

	test('Less digits', () => {
		expect(
			() =>
				new Geolocation({
					ip: '0.0.0',
					countryName: 'Brazil',
					countryCode: 'BR',
					countryFlag: '🇧🇷',
					stateName: 'Minas Gerais',
					stateCode: 'MG',
					city: 'Uberlândia',
					latitude: -19.0233,
					longitude: -48.3348,
				})
		).toThrow("Campo 'Endereço IP' inválido: formato inválido.");
	});

	test('More digits', () => {
		expect(
			() =>
				new Geolocation({
					ip: '0.0.0.0.0',
					countryName: 'Brazil',
					countryCode: 'BR',
					countryFlag: '🇧🇷',
					stateName: 'Minas Gerais',
					stateCode: 'MG',
					city: 'Uberlândia',
					latitude: -19.0233,
					longitude: -48.3348,
				})
		).toThrow("Campo 'Endereço IP' inválido: formato inválido.");
	});
});

describe('Country Name', () => {
	test('Empty', () => {
		expect(
			() =>
				new Geolocation({
					ip: '0.0.0.0',
					countryName: ' ',
					countryCode: 'BR',
					countryFlag: '🇧🇷',
					stateName: 'Minas Gerais',
					stateCode: 'MG',
					city: 'Uberlândia',
					latitude: -19.0233,
					longitude: -48.3348,
				})
		).toThrow("Campo 'Nome do país' inválido: não pode ser vazio.");
	});
});

describe('Country Code', () => {
	test('Empty', () => {
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
		).toThrow("Campo 'Cód do país' inválido: não pode ser vazio.");
	});
});

describe('Country Flag', () => {
	test('Empty', () => {
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
		).toThrow("Campo 'Bandeira do país' inválido: não pode ser vazio.");
	});
});

describe('State Name', () => {
	test('Empty', () => {
		expect(
			() =>
				new Geolocation({
					ip: '0.0.0.0',
					countryName: 'Brazil',
					countryCode: 'BR',
					countryFlag: '🇧🇷',
					stateName: ' ',
					stateCode: 'MG',
					city: 'Uberlândia',
					latitude: -19.0233,
					longitude: -48.3348,
				})
		).toThrow("Campo 'Nome do estado' inválido: não pode ser vazio.");
	});
});

describe('State Code', () => {
	test('Empty', () => {
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
		).toThrow("Campo 'Cód do estado' inválido: não pode ser vazio.");
	});
});

describe('City', () => {
	test('Empty', () => {
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
		).toThrow("Campo 'Cidade' inválido: não pode ser vazio.");
	});
});

describe('Latitude', () => {
	test('Less than -90', () => {
		expect(
			() =>
				new Geolocation({
					ip: '0.0.0.0',
					countryName: 'Brazil',
					countryCode: 'BR',
					countryFlag: '🇧🇷',
					stateName: 'Minas Gerais',
					stateCode: 'MG',
					city: 'Uberlândia',
					latitude: -91.0233,
					longitude: -48.3348,
				})
		).toThrow("Campo 'Latitude' inválido: range permitido é de -90 a 90.");
	});

	test('Bigger than 90', () => {
		expect(
			() =>
				new Geolocation({
					ip: '0.0.0.0',
					countryName: 'Brazil',
					countryCode: 'BR',
					countryFlag: '🇧🇷',
					stateName: 'Minas Gerais',
					stateCode: 'MG',
					city: 'Uberlândia',
					latitude: 91.0233,
					longitude: -48.3348,
				})
		).toThrow("Campo 'Latitude' inválido: range permitido é de -90 a 90.");
	});
});

describe('Longitude', () => {
	test('Less than -180', () => {
		expect(
			() =>
				new Geolocation({
					ip: '0.0.0.0',
					countryName: 'Brazil',
					countryCode: 'BR',
					countryFlag: '🇧🇷',
					stateName: 'Minas Gerais',
					stateCode: 'MG',
					city: 'Uberlândia',
					latitude: -19.0233,
					longitude: -180.3348,
				})
		).toThrow("Campo 'Longitude' inválido: range permitido é de -180 a 180.");
	});

	test('Bigger than 180', () => {
		expect(
			() =>
				new Geolocation({
					ip: '0.0.0.0',
					countryName: 'Brazil',
					countryCode: 'BR',
					countryFlag: '🇧🇷',
					stateName: 'Minas Gerais',
					stateCode: 'MG',
					city: 'Uberlândia',
					latitude: -19.0233,
					longitude: 180.3348,
				})
		).toThrow("Campo 'Longitude' inválido: range permitido é de -180 a 180.");
	});
});
