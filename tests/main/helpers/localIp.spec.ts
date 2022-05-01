import { setLocalIp } from '@main/helpers';
import { Geolocation } from '@domain/entities';

describe('Local IP', () => {
	jest.setTimeout(30 * 1000);

	it('Should inject local IP address as env var', async () => {
		expect(process.env.LOCAL_IP).toBe(undefined);

		const localIp = await setLocalIp();

		expect(Geolocation.validateIpAddress(localIp)).toBeTruthy();

		expect(process.env.LOCAL_IP).toBe(localIp);
	});
});
