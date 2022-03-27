import { Router, Request, Response, NextFunction } from 'express';
import { ok } from '@presentation/protocols';
import pkgJson from '@root/package.json';

export default (router: Router): void => {
	router.get('/', (req: Request, res: Response, next: NextFunction) =>
		next(
			ok({
				message: 'Bem vindo(a) ao Template NodeJS API',
				result: { name: 'API Template', version: pkgJson.version, repo: 'https://github.com/arturdonda/API_Template_CleanArch' },
			})
		)
	);
};
