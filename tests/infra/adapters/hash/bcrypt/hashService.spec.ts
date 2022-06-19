import { HashService } from '@infra/adapters/hash/bcrypt';

describe('Bcrypt hash service', () => {
	const hashService = new HashService();

	const password = 'test123';
	let hash: string;

	it('should return hash', () => {
		hash = hashService.hash(password);

		expect(hash).not.toBe(password);
	});

	it('should return true if hash compared to correct password', () => {
		expect(hashService.verify(password, hash)).toBeTruthy();
	});

	it('should return false if hash compared to wrong password', () => {
		expect(hashService.verify('password', hash)).toBeFalsy();
	});
});
