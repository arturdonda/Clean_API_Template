export interface IRenewAccess {
	exec: (sessionToken: string) => Promise<string>;
}
