export interface IEmailService {
	send: ({ to, cc, bcc, subject, body }: IEmailService.Params) => Promise<IEmailService.Result>;
}

export namespace IEmailService {
	export type Params = { to: string[]; cc: string[]; bcc: string[]; subject: string; body: string };
	export type Result = void;
}
