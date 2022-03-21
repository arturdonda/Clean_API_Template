import { User } from '@/domain/entities/classes';

export interface ISignIn {
	signIn: ({ email, password, ipAddress }: ISignIn.Params) => Promise<ISignIn.Result>;
}

export namespace ISignIn {
	export type Params = {
		email: string;
		password: string;
		ipAddress: string;
	};

	export type Result = {
		user: User;
		refreshToken: string;
		accessToken: string;
	};
}
