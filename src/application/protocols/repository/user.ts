import { User } from '@/domain/entities/classes';

export interface IUserRepository {
	getById: (userId: string) => Promise<User | null>;
	getByConfirmationCode: (confirmationCode: string) => Promise<User | null>;
	getByEmail: (email: string) => Promise<User | null>;
	create: (user: User) => Promise<User>;
	update: (user: User) => Promise<User>;
}
