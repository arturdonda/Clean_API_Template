import { IHashService } from '@/application/protocols/utils';

export class MockHashService implements IHashService {
	hash = (password: string): string => {
		return password.split('').reverse().join('');
	};

	verify = (password: string, hash: string): boolean => {
		return this.hash(password) === hash;
	};
}
