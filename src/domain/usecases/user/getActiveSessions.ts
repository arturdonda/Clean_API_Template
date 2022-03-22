import { Session } from '@/domain/entities/classes';

export interface IGetActiveSessions {
	exec: ({ userId }: IGetActiveSessions.Params) => Promise<IGetActiveSessions.Result>;
}

export namespace IGetActiveSessions {
	export type Params = {
		userId: string;
	};

	export type Result = Session[];
}
