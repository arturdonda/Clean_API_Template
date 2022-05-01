import { authorize } from '@main/middlewares';
import { Request, Response, NextFunction } from 'express';
import { unauthorized } from '@presentation/helpers';
import { AccessTokenService } from '@infra/adapters/token/jsonwebtoken';

describe('Authorize middleware', () => {
	const response: Partial<Response> = {};
	const next: NextFunction = jest.fn();

	beforeEach(() => jest.resetAllMocks());

	it('Should return unauthorized (no auth header)', async () => {
		const request: Partial<Request> = { headers: {} };

		await authorize(request as Request, response as Response, next);

		expect(next).toHaveBeenCalledTimes(1);
		expect(next).toHaveBeenCalledWith(unauthorized({ message: 'Você deve fazer o login antes.', result: null }));
	});

	it('Should return unauthorized (invalid auth header)', async () => {
		const request: Partial<Request> = { headers: { authorization: '123' } };

		await authorize(request as Request, response as Response, next);

		expect(next).toHaveBeenCalledTimes(1);
		expect(next).toHaveBeenCalledWith(unauthorized({ message: 'Você deve fazer o login antes.', result: null }));
	});

	it('Should return unauthorized (invalid token)', async () => {
		const request: Partial<Request> = { headers: { authorization: 'Bearer 123' } };

		await authorize(request as Request, response as Response, next);

		expect(next).toHaveBeenCalledTimes(1);
		expect(next).toHaveBeenCalledWith(unauthorized({ message: 'Token inválido', result: null }));
	});

	it('Should return unauthorized (expired token)', async () => {
		const request: Partial<Request> = {
			headers: {
				authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTEzMjUzNTQsImV4cCI6MTY1MTMyNjI1NCwiYXVkIjoiNjI1MWQzZDM1NGQ0MzY3NGE4NmU0NzYzIiwiaXNzIjoieW91ckhvc3RVcmwuY29tIn0.ztIy2zZYybq8qgiFf9OacZhv9CdCZL0r9izxVH0hU6g',
			},
		};

		await authorize(request as Request, response as Response, next);

		expect(next).toHaveBeenCalledTimes(1);
		expect(next).toHaveBeenCalledWith(unauthorized({ message: 'Token de acesso expirado', result: null }));
	});

	it('Should pass and inject userId in request object', async () => {
		const accessTokenService = new AccessTokenService();
		const { token: accessToken } = accessTokenService.generate('123');

		const request: Partial<Request> = { headers: { authorization: `Bearer ${accessToken}` } };

		await authorize(request as Request, response as Response, next);

		expect(next).toHaveBeenCalledTimes(1);
		expect(next).toHaveBeenCalledWith();
		expect(request.userId).toBe('123');
	});
});
