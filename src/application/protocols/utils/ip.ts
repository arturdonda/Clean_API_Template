import { Geolocation } from '@/domain/entities/classes';

export interface IIpService {
	lookup: (ipAddress: string) => Promise<IIpService.Result>;
}

export namespace IIpService {
	export type Result = Geolocation;
}
