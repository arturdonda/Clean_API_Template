export interface IActivate {
	exec: ({ confirmationCode }: IActivate.Params) => Promise<IActivate.Result>;
}

export namespace IActivate {
	export type Params = {
		confirmationCode: string;
	};

	export type Result = void;
}
