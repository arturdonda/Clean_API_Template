import { Session } from '@/domain/entities/classes';

export interface IGetActiveSessions {
	getActiveSessions: ({ userId }: IGetActiveSessions.Params) => Promise<IGetActiveSessions.Result>;
}

export namespace IGetActiveSessions {
	export type Params = {
		userId: string;
	};

	export type Result = Session[];
}
