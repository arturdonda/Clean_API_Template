import { Session, User } from '@/domain/entities/classes';

export interface IUserService {
	signUp: ({ name, email, password, confirmationPassword }: IUserService.SignUpParams) => Promise<IUserService.SignUpResult>;
	signIn: ({ email, password, ipAddress }: IUserService.SignInParams) => Promise<IUserService.SignInResult>;
	activate: ({ confirmationCode }: IUserService.ActivateParams) => Promise<void>;
	forgotPassword: ({ email }: IUserService.ForgotPasswordParams) => Promise<void>;
	updatePassword: ({ userId, password, confirmationPassword }: IUserService.UpdatePasswordParams) => Promise<void>;
	updateOptionalData: ({
		userId,
		address,
		birthday,
		cpf,
		gender,
		phone,
		rg,
	}: IUserService.UpdateOptionalDataParams) => Promise<IUserService.UpdateOptionalDataResult>;
	getProfile: ({ userId }: IUserService.GetProfileParams) => Promise<IUserService.GetProfileResult>;
	getActiveSessions: ({ userId }: IUserService.GetActiveSessionsParams) => Promise<IUserService.GetActiveSessionsResult>;
}

export namespace IUserService {
	export type SignUpParams = {
		name: string;
		email: string;
		password: string;
		confirmationPassword: string;
	};

	export type SignUpResult = {
		user: User;
	};

	export type SignInParams = {
		email: string;
		password: string;
		ipAddress: string;
	};

	export type SignInResult = {
		user: User;
		refreshToken: string;
		accessToken: string;
	};

	export type ActivateParams = {
		confirmationCode: string;
	};

	export type ForgotPasswordParams = {
		email: string;
	};

	export type UpdatePasswordParams = {
		userId: string;
		password: string;
		confirmationPassword: string;
	};

	export type UpdateOptionalDataParams = {
		userId: string;
		address?: string;
		birthday?: Date;
		cpf?: string;
		gender?: string;
		phone?: string;
		rg?: string;
	};

	export type UpdateOptionalDataResult = {
		user: User;
	};

	export type GetProfileParams = {
		userId: string;
	};

	export type GetProfileResult = {
		user: User;
	};

	export type GetActiveSessionsParams = {
		userId: string;
	};

	export type GetActiveSessionsResult = {
		sessions: Session[];
	};
}
