import { AccessTokenService } from '@infra/adapters/token/jsonwebtoken';
import { unauthorized } from '@presentation/helpers';
import { Request, Response, NextFunction } from 'express';

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))
		return next(unauthorized({ message: 'Você deve fazer o login antes.', result: null }));

	const accessTokenService = new AccessTokenService();

	const accessToken = accessTokenService.validate(req.headers.authorization.split(' ')[1]);

	if (accessToken.expiredAt >= new Date()) return next(unauthorized({ message: 'Token de acesso expirado', result: null }));

	req.userId = accessToken.audience;
	return next();
};
