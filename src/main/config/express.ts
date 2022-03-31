require('dotenv').config();
import '../../../module-alias';
import { setupRoutes } from '@main/config/routes';
import { createApiResponse } from '@main/middlewares';
import express from 'express';

const app = express();

// Setup routes
setupRoutes(app);

// Setup middlewares
app.use(createApiResponse);

export default app;
