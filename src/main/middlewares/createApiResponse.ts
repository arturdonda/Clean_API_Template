import { HttpResponse } from '@presentation/protocols';
import { Request, Response, NextFunction } from 'express';

export const createApiResponse = async (httpResponse: HttpResponse, req: Request, res: Response, next: NextFunction) => {
	if (httpResponse.headers) Object.entries(httpResponse.headers).forEach(entry => res.setHeader(entry[0], entry[1]));
	if (httpResponse.cookies) Object.entries(httpResponse.cookies).forEach(entry => res.cookie(entry[0], entry[1], { httpOnly: true }));

	res.status(httpResponse.statusCode).json(httpResponse.body);
};
