export interface IForgotPassword {
	exec: ({ email }: IForgotPassword.Params) => Promise<IForgotPassword.Result>;
}

export namespace IForgotPassword {
	export type Params = {
		email: string;
	};

	export type Result = void;
}
