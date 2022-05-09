import { Session, Geolocation } from '@domain/entities';
import { InvalidParamError } from '@domain/errors';

const validateCreatedAtSpy = jest.spyOn(Session, 'validateCreatedAt');
const validateTokenSpy = jest.spyOn(Session, 'validateToken');

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

describe('Getters', () => {
	it('should return all fields correctly', () => {
		const session = new Session({
			token: '12345',
			expiredAt: new Date(new Date().valueOf() + 86400000),
			createdBy: geolocation,
		});

		expect(session.token).toBe('12345');
		expect(session.expiredAt.valueOf() / 1000).toBeCloseTo(new Date(new Date().valueOf() + 86400000).valueOf() / 1000, 0);
		expect(session.createdAt.valueOf() / 1000).toBeCloseTo(new Date().valueOf() / 1000, 0);
		expect(session.revokedAt).toBeNull();
		expect(session.createdBy).toEqual(geolocation);
		expect(session.revokedBy).toBeNull();
		expect(session.isExpired).toBeFalsy();
		expect(session.isActive).toBeTruthy();
	});
});

describe('Field validation', () => {
	it('should validate fields upon creation', () => {
		new Session({
			token: '12345',
			expiredAt: new Date(new Date().valueOf() + 86400000),
			createdAt: new Date(),
			createdBy: geolocation,
		});

		expect(validateCreatedAtSpy).toHaveBeenCalled();
		expect(validateTokenSpy).toHaveBeenCalled();
	});
});

describe('Static validation', () => {
	describe('Created At', () => {
		it('should return created at', () => {
			expect(Session.validateCreatedAt(new Date(2000, 0, 1))).toEqual(new Date(2000, 0, 1));
		});

		it('should throw InvalidParamError', () => {
			expect(() => Session.validateCreatedAt(new Date(new Date().valueOf() + 86400 * 1000))).toThrow(InvalidParamError);
		});
	});

	describe('Token', () => {
		it('should return token', () => {
			expect(Session.validateToken('12345')).toBe('12345');
		});

		it('should throw InvalidParamError', () => {
			expect(() => Session.validateToken('')).toThrow(InvalidParamError);
		});
	});
});
