import { IHashService } from '@application/protocols/utils';
import bcrypt from 'bcryptjs';

export class HashService implements IHashService {
	hash = (password: string): string => {
		const salt = bcrypt.genSaltSync();

		return bcrypt.hashSync(password, salt);
	};

	verify = (password: string, hash: string): boolean => {
		return bcrypt.compareSync(password, hash);
	};
}
