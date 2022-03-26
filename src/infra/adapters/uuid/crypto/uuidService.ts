import { IUuidService } from '@application/protocols/utils';
import { randomUUID } from 'crypto';

export class UuidService implements IUuidService {
	generate = (seed?: string): string => {
		return randomUUID().toString().replace(/-/g, '');
	};
}
