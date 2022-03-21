import { User } from '@/domain/entities/classes';

export interface IGetProfile {
	getProfile: ({ userId }: IGetProfile.Params) => Promise<IGetProfile.Result>;
}

export namespace IGetProfile {
	export type Params = {
		userId: string;
	};

	export type Result = User;
}
