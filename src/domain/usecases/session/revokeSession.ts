export interface IRevokeSession {
	exec: ({ sessionToken, ipAddress }: IRevokeSession.Params) => Promise<IRevokeSession.Result>;
}

export namespace IRevokeSession {
	export type Params = {
		sessionToken: string;
		ipAddress: string;
	};

	export type Result = void;
}
