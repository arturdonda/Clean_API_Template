require('dotenv').config();
import '../../../module-alias';
import { setupRoutes } from '@main/config/routes';
import { createApiResponse } from '@main/middlewares';
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

export default app;
