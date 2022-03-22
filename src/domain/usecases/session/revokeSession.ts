export interface IRevokeSession {
	exec: ({ refreshToken, ipAddress }: IRevokeSession.Params) => Promise<IRevokeSession.Result>;
}

export namespace IRevokeSession {
	export type Params = {
		refreshToken: string;
		ipAddress: string;
	};

	export type Result = void;
}
