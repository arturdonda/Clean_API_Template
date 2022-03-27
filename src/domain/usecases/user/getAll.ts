import { User } from '@domain/entities';

export interface IGetAllUsers {
	exec: () => Promise<IGetAllUsers.Result>;
}

export namespace IGetAllUsers {
	export type Result = User[];
}
