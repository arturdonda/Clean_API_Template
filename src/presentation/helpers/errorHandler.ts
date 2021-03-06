import { badRequest, internalServerError } from '@presentation/helpers';

export const errorHandler = (error: any, friendlyMessage: string) => {
	if (process.env.NODE_ENV !== 'test') console.error(error);

	return (error.userError ? badRequest : internalServerError)({
		message: friendlyMessage,
		result: {
			name: error.name,
			message: (error.userError ? '' : 'Internal Server Error: ') + error.message,
			stack: error.stack ?? null,
		} as any,
	});
};
