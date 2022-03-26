import { Geolocation } from '@/domain/entities';

export interface IIpService {
	lookup: (ipAddress: string) => Promise<IIpService.Result>;
}

export namespace IIpService {
	export type Result = Geolocation;
}
