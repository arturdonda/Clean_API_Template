import mongoose from 'mongoose';
import { userModel as User } from './models';

mongoose
	.connect(`${process.env.MONGODB_CONNECTION_STRING}`)
	.then(() => console.log('[Database]: 📖 Connection established'))
	.catch(error => {
		console.error(error);
		console.log(`[Database]: ❌ Connection Error`);
	});

mongoose.connection.on('disconnected', () => console.log('[Database]: 📘 Connection terminated'));
mongoose.connection.on('error', error => {
	console.error(error);
	console.log('[Database]: ❌ An error ocurred. Check output above for more details.');
});

process.on('SIGINT', async () => {
	await mongoose.connection.close();
	process.exit(0);
});

export default {
	User,
};
