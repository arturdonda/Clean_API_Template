import { User } from '@/domain/entities/classes';

export interface IUserRepository {
	getById: (userId: string) => Promise<IUserRepository.Result | null>;
	getByConfirmationCode: (confirmationCode: string) => Promise<IUserRepository.Result | null>;
	getByEmail: (email: string) => Promise<IUserRepository.Result | null>;
	create: (user: User) => Promise<IUserRepository.Result>;
	update: (user: User) => Promise<IUserRepository.Result>;
}

export namespace IUserRepository {
	export type Result = User;
}
