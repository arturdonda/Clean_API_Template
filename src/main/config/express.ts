require('dotenv').config();
import '../../../module-alias';
import { setupRoutes } from '@main/config/routes';
import { createApiResponse } from '@main/middlewares';
import { setLocalIp } from '@main/helpers';
import mongo from '@infra/adapters/db/mongoose';
import express, { Express } from 'express';
import cookieParser from 'cookie-parser';

export const configureApp = async (mode: 'dev' | 'prod' | 'test' = process.env.NODE_ENV): Promise<Express> => {
	const app = express();

	// Setup middlewares
	app.use(express.json());
	app.use(cookieParser());

	// Setup routes
	setupRoutes(app);

	// Setup response middleware
	app.use(createApiResponse);

	// Set local ip address if in dev environment
	if (mode === 'dev') await setLocalIp();

	// Connect to database if not in test environment
	if (mode !== 'test') await mongo.connect(process.env.MONGODB_CONNECTION_STRING);

	return app;
};
