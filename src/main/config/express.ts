require('dotenv').config();
import '../../../module-alias';
import { setupRoutes } from '@main/config/routes';
import { createApiResponse } from '@main/middlewares';
import { setLocalIp } from '@main/helpers';
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

// Setup middlewares
app.use(express.json());
app.use(cookieParser());

// Setup routes
setupRoutes(app);

// Setup response middleware
app.use(createApiResponse);

// Set local ip address if in dev environment
if (process.env.NODE_ENV === 'dev') setLocalIp();

export default app;
