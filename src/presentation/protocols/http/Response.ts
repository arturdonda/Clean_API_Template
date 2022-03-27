export type HttpResponse<T = any> = {
	statusCode: number;
	headers: Record<string, string>;
	cookies: Record<string, string>;
	body: ApiResponse<T>;
};

export type ApiResponse<T = any> = {
	success: boolean;
	message: string;
	result: T;
};
