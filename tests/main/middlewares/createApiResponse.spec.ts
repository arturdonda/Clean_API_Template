import { HttpResponse } from '@presentation/protocols';
import { createApiResponse } from '@main/middlewares';
import { Request, Response, NextFunction } from 'express';

describe('Create API resposne middleware', () => {
	const request: Partial<Request> = {};
	let response: Partial<Response> = {
		setHeader: jest.fn(),
		cookie: jest.fn(),
		json: jest.fn(),
		status: (code: number) => {
			response = { ...response, statusCode: code };
			return response as Response;
		},
	};
	const next: NextFunction = jest.fn();

	const httpResponse: HttpResponse = {
		statusCode: 200,
		headers: { authorization: 'Bearer 123', foo: 'bar' },
		cookies: { sessionToken: 'abc' },
		body: {
			success: true,
			message: '',
			result: null,
		},
	};

	it('Should inject headers', async () => {
		await createApiResponse(httpResponse, request as Request, response as Response, next);

		Object.entries(httpResponse.headers).forEach(header => expect(response.setHeader).toBeCalledWith(header[0], header[1]));
	});

	it('Should inject cookies', async () => {
		await createApiResponse(httpResponse, request as Request, response as Response, next);

		Object.entries(httpResponse.cookies).forEach(cookie => expect(response.cookie).toBeCalledWith(cookie[0], cookie[1], { httpOnly: true }));
	});

	it('Should set statusCode', async () => {
		await createApiResponse(httpResponse, request as Request, response as Response, next);

		expect(response.statusCode).toBe(httpResponse.statusCode);
	});

	it('Should return body as JSON', async () => {
		await createApiResponse(httpResponse, request as Request, response as Response, next);

		expect(response.json).toBeCalledWith(httpResponse.body);
	});
});
