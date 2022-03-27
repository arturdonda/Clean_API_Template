import { User as UserEntity } from '@domain/entities';

export interface IUserRepository {
	getAll: () => Promise<IUserRepository.User[]>;
	getById: (userId: string) => Promise<IUserRepository.User | null>;
	getByConfirmationCode: (confirmationCode: string) => Promise<IUserRepository.User | null>;
	getByEmail: (email: string) => Promise<IUserRepository.User | null>;
	getByCpf: (cpf: string) => Promise<IUserRepository.User | null>;
	getByRg: (rg: string) => Promise<IUserRepository.User | null>;
	create: (user: IUserRepository.User) => Promise<IUserRepository.User>;
	update: (user: IUserRepository.User) => Promise<IUserRepository.User | null>;
}

export namespace IUserRepository {
	export type User = UserEntity;
}
