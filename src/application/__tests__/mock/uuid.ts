import { randomUUID } from 'crypto';
import { IUuidService } from '@/application/protocols/utils';

export class MockUuidService implements IUuidService {
	generate = (seed?: string): string => {
		return randomUUID().toString().replace(/-/g, '');
	};
}
