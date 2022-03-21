export interface IForgotPassword {
	forgotPassword: ({ email }: IForgotPassword.Params) => Promise<IForgotPassword.Result>;
}

export namespace IForgotPassword {
	export type Params = {
		email: string;
	};

	export type Result = void;
}
