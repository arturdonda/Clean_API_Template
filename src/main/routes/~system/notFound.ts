import { Router, Request, Response, NextFunction } from 'express';
import { notFound } from '@presentation/protocols';

export default (router: Router): void => {
	router.get('*', (req: Request, res: Response, next: NextFunction) => next(notFound({ message: 'Nenhuma rota encontrada.', result: null })));

	// This route must be the last one to be added to the router, otherwise will overide other routes.
};
