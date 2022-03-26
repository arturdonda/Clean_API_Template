import { User } from '@/domain/entities';

export class UserViewModel {
	id: string;
	address: string | null;
	birthday: string | null;
	cpf: string | null;
	createDate: string;
	email: string;
	gender: string | null;
	name: string;
	phone: string | null;
	rg: string | null;

	static map(entity: User): UserViewModel {
		return {
			id: entity.id,
			address: entity.address,
			birthday: entity.birthday ? entity.birthday.toISOString() : null,
			cpf: entity.cpf,
			createDate: entity.createDate.toISOString(),
			email: entity.email,
			gender: entity.gender,
			name: entity.name,
			phone: entity.phone,
			rg: entity.rg,
		};
	}

	static mapCollection(entities: User[]): UserViewModel[] {
		return entities.map(entity => UserViewModel.map(entity));
	}
}
