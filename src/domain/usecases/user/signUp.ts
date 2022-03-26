import { User } from '@/domain/entities';

export interface ISignUp {
	exec: ({ name, email, password, confirmationPassword }: ISignUp.Params) => Promise<ISignUp.Result>;
}

export namespace ISignUp {
	export type Params = {
		name: string;
		email: string;
		password: string;
		confirmationPassword: string;
	};

	export type Result = User;
}
