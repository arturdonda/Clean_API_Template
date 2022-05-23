import http from 'http';

export const setLocalIp = (): Promise<string> => {
	return new Promise((resolve, reject) => {
		http.get('http://api.ipify.org/?format=json', res => {
			let data: any = [];

			/* istanbul ignore next */
			res.on('data', chunck => data.push(chunck));

			/* istanbul ignore next */
			res.on('error', () => reject());

			res.on('end', () => {
				const result: { ip: string } = JSON.parse(Buffer.concat(data).toString());

				process.env.LOCAL_IP = result.ip;
				console.log('LOCAL_IP: ', process.env.LOCAL_IP);
				resolve(result.ip);
			});
		});
	});
};
