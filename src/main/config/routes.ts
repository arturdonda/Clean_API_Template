import { Express, Router } from 'express';
import { readdirSync } from 'fs';

export const setupRoutes = (app: Express): void => {
	const router = Router();

	app.use('/api', router);

	applyFunctionToAllFilesInDir('/../routes', async filePath => (await import(`.${filePath}`)).default(router));
};

const applyFunctionToAllFilesInDir = async (path: string, functionToApply: (filePath: string) => void) => {
	try {
		readdirSync(`${__dirname}/${path}`).map(dir => applyFunctionToAllFilesInDir(`${path}/${dir}`, functionToApply));
	} catch (err) {
		functionToApply(path);
	}
};
