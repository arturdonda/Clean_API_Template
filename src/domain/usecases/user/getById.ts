import { User } from '@domain/entities';

export interface IGetUserById {
	exec: ({ userId }: IGetUserById.Params) => Promise<IGetUserById.Result>;
}

export namespace IGetUserById {
	export type Params = {
		userId: string;
	};

	export type Result = User;
}
