import { Session, User } from '@/domain/entities/classes';

export interface IUserService {
	signUp: ({ name, email, password, confirmationPassword }: { name: string; email: string; password: string; confirmationPassword: string }) => Promise<User>;
	signIn: ({
		email,
		password,
		ipAddress,
	}: {
		email: string;
		password: string;
		ipAddress: string;
	}) => Promise<{ user: User; refreshToken: string; accessToken: string }>;
	activate: ({ confirmationCode }: { confirmationCode: string }) => Promise<void>;
	forgotPassword: ({ email }: { email: string }) => Promise<void>;
	updatePassword: ({ userId, password, confirmationPassword }: { userId: string; password: string; confirmationPassword: string }) => Promise<void>;
	updateOptionalData: ({
		userId,
		address,
		birthday,
		cpf,
		gender,
		phone,
		rg,
	}: {
		userId: string;
		address?: string;
		birthday?: Date;
		cpf?: string;
		gender?: string;
		phone?: string;
		rg?: string;
	}) => Promise<User>;
	getProfile: ({ userId }: { userId: string }) => Promise<User>;
	getActiveSessions: ({ userId }: { userId: string }) => Promise<Session[]>;
}
