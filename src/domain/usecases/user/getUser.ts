import { User } from '@/domain/entities/classes';

export interface IGetUser {
	exec: ({ userId }: IGetUser.Params) => Promise<IGetUser.Result>;
}

export namespace IGetUser {
	export type Params = {
		userId: string;
	};

	export type Result = User;
}
