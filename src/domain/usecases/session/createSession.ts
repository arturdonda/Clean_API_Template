import { Session } from '@/domain/entities';

export interface ICreateSession {
	exec: ({ userId, ipAddress }: ICreateSession.Params) => Promise<ICreateSession.Result>;
}

export namespace ICreateSession {
	export type Params = {
		userId: string;
		ipAddress: string;
	};

	export type Result = Session;
}
