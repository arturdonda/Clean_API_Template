import { Geolocation } from '@domain/entities';
import { IpService } from '@infra/adapters/ip/ipdata';
import { InvalidIpError } from '@infra/errors';
import { setLocalIp } from '@main/helpers';

describe('IpData ip service', () => {
	const ipService = new IpService();

	beforeAll(async () => await setLocalIp());

	it('should return location', async () => {
		const result = await ipService.lookup(process.env.LOCAL_IP);

		expect(result).toEqual<Geolocation>(
			expect.objectContaining({
				ip: process.env.LOCAL_IP,
			})
		);
	});

	it('should return InvalidIpError if invalid IP', async () => {
		expect(() => ipService.lookup('127.0.0.1')).rejects.toThrow(InvalidIpError);
	});
});
