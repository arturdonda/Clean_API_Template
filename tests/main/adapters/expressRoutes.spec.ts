import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { adaptRoute } from '@main/adapters';
import { Request, Response, NextFunction } from 'express';

class TestController implements Controller {
	handle = async (request: HttpRequest): Promise<HttpResponse<any>> => {
		return new Promise((resolve, reject) =>
			resolve({
				statusCode: 200,
				body: null,
				cookies: undefined,
				headers: undefined,
			})
		);
	};
}
describe('Adapt Express Routes', () => {
	const testController = new TestController();
	const controllerSpy = jest.spyOn(testController, 'handle');

	const request: Partial<Request> = {
		ip: ':::0.0.0.0',
		params: { id: '0' },
		headers: { authorization: '123' },
		cookies: { foo: 'bar' },
		body: { a: 'a', b: 'b', c: 'c' },
		userId: '123',
	};
	const response: Partial<Response> = {};
	const next: NextFunction = jest.fn();

	it("Should call Controller's handle method", async () => {
		const middleware = adaptRoute(testController);

		await middleware(request as Request, response as Response, next);

		expect(controllerSpy).toHaveBeenCalledTimes(1);
		expect(next).toHaveBeenCalledTimes(1);
		expect(controllerSpy).toHaveBeenCalledWith({
			ip: '0.0.0.0',
			query: { id: '0' },
			headers: { authorization: '123' },
			cookies: { foo: 'bar' },
			body: { a: 'a', b: 'b', c: 'c' },
			userId: '123',
		});
	});
});
