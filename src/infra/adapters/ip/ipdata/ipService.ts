import { Geolocation } from '@domain/entities';
import { IIpService } from '@application/protocols/utils';
import { InvalidIpError } from '@infra/errors';
import ipData from 'ipdata';

export class IpService implements IIpService {
	private _ipDataClient: ipData;

	constructor() {
		this._ipDataClient = new ipData(process.env.IPDATA_KEY);
	}
	lookup = async (ipAddress: string): Promise<IIpService.Result> => {
		const result = await this._ipDataClient.lookup(ipAddress);

		if (result.status === 400) throw new InvalidIpError(ipAddress);

		return new Geolocation({
			ip: result.ip,
			countryName: result.country_name,
			countryCode: result.country_code,
			countryFlag: result.emoji_flag,
			stateName: result.region ?? '',
			stateCode: result.region_code ?? '',
			city: result.city ?? '',
			latitude: result.latitude,
			longitude: result.longitude,
		});
	};
}
