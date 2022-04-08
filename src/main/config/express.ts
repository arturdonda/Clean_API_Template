require('dotenv').config();
import '../../../module-alias';
import { setupRoutes } from '@main/config/routes';
import { createApiResponse } from '@main/middlewares';
import express from 'express';

const app = express();

// Setup middlewares
app.use(express.json());

// Setup routes
setupRoutes(app);

// Setup response middleware
app.use(createApiResponse);

export default app;
