export interface IUpdatePassword {
	updatePassword: ({ userId, password, confirmationPassword }: IUpdatePassword.Params) => Promise<IUpdatePassword.Result>;
}

export namespace IUpdatePassword {
	export type Params = {
		userId: string;
		password: string;
		confirmationPassword: string;
	};

	export type Result = void;
}
