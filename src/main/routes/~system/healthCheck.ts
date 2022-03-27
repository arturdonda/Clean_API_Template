import { Request, Response, Router } from 'express';
import { ApiResponse } from '@presentation/protocols';
import pkgJson from '@root/package.json';

export default (router: Router): void => {
	const response: ApiResponse = {
		success: true,
		message: 'Bem vindo(a) ao Template NodeJS API',
		result: {
			name: 'API Template',
			version: pkgJson.version,
			repo: 'https://github.com/arturdonda/API_Template_CleanArch',
		},
	};

	router.get('/', (req: Request, res: Response) => res.status(200).json(response));
};
