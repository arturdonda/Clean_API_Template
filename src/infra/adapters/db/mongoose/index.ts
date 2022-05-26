import mongoose from 'mongoose';
import { userModel } from './models';

let Client: typeof mongoose = null;
let Uri: string = null;

export default {
	get client() {
		return Client;
	},
	get uri() {
		return Uri;
	},
	connect: (uri: string): Promise<void> =>
		mongoose
			.connect(uri)
			.then(client => {
				Uri = uri;
				Client = client;

				console.log('[Database]: 📖 Connection established');

				mongoose.connection.on('disconnected', () => console.log('[Database]: 📘 Connection terminated'));
				mongoose.connection.on('error', error => {
					console.error(error);
					console.log('[Database]: ❌ An error ocurred. Check output above for more details.');
				});

				process.on('SIGINT', async () => {
					await mongoose.connection.close();
					process.exit(0);
				});
			})
			.catch(error => {
				console.error(error);
				console.log(`[Database]: ❌ Connection Error`);
			}),
	disconnect: () => mongoose.connection.close(),
	get collections() {
		return {
			User: getCollection(this.client, this.uri, userModel),
		};
	},
};

const getCollection = async <T = any>(client: typeof mongoose, uri: string, collection: mongoose.Model<T>) => {
	if (client && client.connection.readyState !== 1) await client.connect(uri);

	return collection;
};
