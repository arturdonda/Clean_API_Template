export type HttpResponse<T = any> = {
	statusCode: number;
	headers: Record<string, string>;
	cookies: Record<string, string>;
	body: {
		success: boolean;
		message: string;
		result: T;
	};
};
