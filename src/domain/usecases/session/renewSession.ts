export interface IRenewSession {
	renewSession: ({ sessionToken }: IRenewSession.Params) => Promise<IRenewSession.Result>;
}

export namespace IRenewSession {
	export type Params = {
		sessionToken: string;
	};

	export type Result = {
		accessToken: string;
	};
}
