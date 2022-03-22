export interface IRenewAccess {
	exec: (sessionToken: string) => string;
}
