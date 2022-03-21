import { Session, Geolocation } from '@/domain/entities/classes';

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

describe('Create new Session', () => {
	test('All valid parameters', () => {
		const session = new Session({
			token: '74b954c3ab0a465a9661fa563cd36553',
			expiredAt: new Date(new Date().getTime() + 86400 * 1000),
			createdBy: geolocation,
		});

		expect(session.token).toBe('74b954c3ab0a465a9661fa563cd36553');
		expect(session.expiredAt.valueOf() / 1000).toBeCloseTo(new Date(new Date().getTime() + 86400 * 1000).valueOf() / 1000, 0);
		expect(session.createdAt.valueOf() / 1000).toBeCloseTo(new Date().valueOf() / 1000, 0);
		expect(session.revokedAt).toBeNull();
		expect(session.createdBy).toStrictEqual(geolocation);
		expect(session.revokedBy).toBeNull();
	});

	test('Invalid Session Token', () => {
		expect(
			() =>
				new Session({
					token: ' ',
					expiredAt: new Date(new Date().getTime() + 86400 * 1000),
					createdBy: geolocation,
				})
		).toThrow("Campo 'Session Token' inválido: não pode ser vazio.");
	});

	test('Invalid Expiration Date', () => {
		expect(
			() =>
				new Session({
					token: '74b954c3ab0a465a9661fa563cd36553',
					expiredAt: new Date(new Date().getTime() - 86400 * 1000),
					createdBy: geolocation,
				})
		).toThrow("Campo 'Data de expiração' inválido: não pode ser no passado.");
	});
});

describe('Revoke Session', () => {
	test('Revoke Session', () => {
		const session = new Session({
			token: '74b954c3ab0a465a9661fa563cd36553',
			expiredAt: new Date(new Date().getTime() + 86400 * 1000),
			createdBy: geolocation,
		});

		session.revoke(geolocation);

		expect(session.revokedAt && session.revokedAt.valueOf() / 1000).toBeCloseTo(new Date().valueOf() / 1000, 0);
		expect(session.revokedBy).toStrictEqual(geolocation);
	});
});
