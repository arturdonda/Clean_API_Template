import { randomUUID } from 'crypto';
import { IUuidService } from '@/application/protocols/utils';

export class UuidService implements IUuidService {
	generate = (seed?: string): string => {
		return randomUUID().toString().replace(/-/g, '');
	};
}
