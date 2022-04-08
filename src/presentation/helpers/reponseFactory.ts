import { HttpResponse } from '@presentation/protocols';

type Params<T = any> = {
	message: string;
	result: T;
	headers?: Record<string, string>;
	cookies?: Record<string, string>;
};

const makeHttpResponse = <T = any>(statusCode: number, params: Params<T>): HttpResponse<T> => ({
	statusCode: statusCode,
	body: {
		success: statusCode >= 200 && statusCode <= 299,
		message: params.message,
		result: params.result,
	},
	cookies: params.cookies,
	headers: params.headers,
});

export const ok = <T = any>(params: Params<T>) => makeHttpResponse<T>(200, params);
export const created = <T = any>(params: Params<T>) => makeHttpResponse<T>(201, params);
export const noContent = <T = any>(params: Params<T>) => makeHttpResponse<T>(204, params);
export const badRequest = <T = any>(params: Params<T>) => makeHttpResponse<T>(400, params);
export const unauthorized = <T = any>(params: Params<T>) => makeHttpResponse<T>(401, params);
export const forbidden = <T = any>(params: Params<T>) => makeHttpResponse<T>(403, params);
export const notFound = <T = any>(params: Params<T>) => makeHttpResponse<T>(404, params);
export const internalServerError = <T = any>(params: Params<T>) => makeHttpResponse<T>(500, params);
