import { User } from '@domain/entities';

export interface ISignIn {
	exec: ({ email, password, ipAddress }: ISignIn.Params) => Promise<ISignIn.Result>;
}

export namespace ISignIn {
	export type Params = {
		email: string;
		password: string;
		ipAddress: string;
	};

	export type Result = {
		user: User;
		sessionToken: string;
		accessToken: string;
	};
}
