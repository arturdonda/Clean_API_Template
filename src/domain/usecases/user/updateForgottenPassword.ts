export interface IUpdateForgottenPassword {
	exec: ({ resetToken, password, confirmationPassword }: IUpdateForgottenPassword.Params) => Promise<IUpdateForgottenPassword.Result>;
}

export namespace IUpdateForgottenPassword {
	export type Params = {
		resetToken: string;
		password: string;
		confirmationPassword: string;
	};

	export type Result = void;
}
