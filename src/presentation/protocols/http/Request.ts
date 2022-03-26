export interface HttpRequest {
	ip: string;
	url: string;
	method: string;
	query: Record<string, string>;
	headers: Record<string, string>;
	cookies: Record<string, string>;
	body: any;
	userId: string;
}
