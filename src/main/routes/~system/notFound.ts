import { Request, Response, Router } from 'express';
import { ApiResponse } from '@presentation/protocols';

export default (router: Router): void => {
	const response: ApiResponse = {
		success: false,
		message: 'Nenhuma rota encontrada.',
		result: null,
	};

	router.get('*', (req: Request, res: Response) => res.status(404).json(response));
};

// This route must be the last one to be added to the router, otherwise will overide other routes.
