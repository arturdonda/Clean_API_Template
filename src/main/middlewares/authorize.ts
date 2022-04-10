import { AccessTokenService } from '@infra/adapters/token/jsonwebtoken';
import { TokenExpiredError } from '@infra/errors';
import { unauthorized } from '@presentation/helpers';
import { Request, Response, NextFunction } from 'express';

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))
		return next(unauthorized({ message: 'Você deve fazer o login antes.', result: null }));

	const accessTokenService = new AccessTokenService();

	try {
		const accessToken = accessTokenService.validate(req.headers.authorization.split(' ')[1]);

		req.userId = accessToken.audience;

		return next();
	} catch (err) {
		next(
			unauthorized({
				message: err instanceof TokenExpiredError ? 'Token de acesso expirado' : 'Token inválido',
				result: null,
			})
		);
	}
};
