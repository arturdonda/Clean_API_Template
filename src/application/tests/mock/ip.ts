import { IIpService } from '@/application/protocols/utils';
import { Geolocation } from '@/domain/entities/classes';

export class MockIpService implements IIpService {
	lookup = (ipAddress: string): Promise<IIpService.Result> => {
		return new Promise((resolve, reject) =>
			resolve(
				new Geolocation({
					ip: ipAddress,
					countryName: 'Brazil',
					countryCode: 'BR',
					countryFlag: '🇧🇷',
					stateName: 'Minas Gerais',
					stateCode: 'MG',
					city: 'Uberlândia',
					latitude: -19.0233,
					longitude: -48.3348,
				})
			)
		);
	};
}
