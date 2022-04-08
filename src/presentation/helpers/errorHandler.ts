import { MissingParamError } from '@presentation/errors';
import { badRequest, internalServerError } from '@presentation/helpers';

export const errorHandler = (error: Error, friendlyMessage: string) => {
	console.error(error);

	return (error instanceof MissingParamError ? badRequest : internalServerError)({
		message: friendlyMessage,
		result: {
			name: error.name,
			message: error.message,
			stack: error.stack ?? null,
		} as any,
	});
};
