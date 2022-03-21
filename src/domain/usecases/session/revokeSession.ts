export interface IRevokeSession {
	revokeSession: ({ userId, refreshToken, ipAddress }: IRevokeSession.Params) => Promise<IRevokeSession.Result>;
}

export namespace IRevokeSession {
	export type Params = {
		userId: string;
		refreshToken: string;
		ipAddress: string;
	};

	export type Result = void;
}
