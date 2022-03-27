export interface IRevokeSession {
	exec: ({ userId, sessionToken, ipAddress }: IRevokeSession.Params) => Promise<IRevokeSession.Result>;
}

export namespace IRevokeSession {
	export type Params = {
		userId: string;
		sessionToken: string;
		ipAddress: string;
	};

	export type Result = void;
}
