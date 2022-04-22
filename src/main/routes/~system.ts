import { ok, notFound } from '@presentation/helpers';
import pkgJson from '@root/package.json';
import { Router, Request, Response, NextFunction } from 'express';

export default (router: Router): void => {
	router.get('/', (req: Request, res: Response, next: NextFunction) =>
		next(
			ok({
				message: 'Bem vindo(a) ao Clean API Template',
				result: {
					name: pkgJson.name,
					description: pkgJson.description,
					version: pkgJson.version,
					author: pkgJson.author,
					license: pkgJson.license,
					repo: pkgJson.repository.url,
				},
			})
		)
	);

	router.get('*', (req: Request, res: Response, next: NextFunction) => next(notFound({ message: 'Nenhuma rota encontrada.', result: null })));
	// *** This route must be the last one to be added to the router, otherwise will overide other routes.
};
