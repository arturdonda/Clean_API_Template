import { setupRoutes } from './routes';
import express from 'express';
import { createApiResponse } from '../middlewares/createApiResponse';

const app = express();

// Setup routes
setupRoutes(app);

// Setup middlewares
app.use(createApiResponse);

export default app;
