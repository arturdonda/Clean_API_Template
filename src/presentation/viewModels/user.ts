import { User } from '@domain/entities';

export class UserViewModel {
	private readonly id: string;
	private readonly address: string | null;
	private readonly birthday: string | null;
	private readonly cpf: string | null;
	private readonly createDate: string;
	private readonly email: string;
	private readonly gender: string | null;
	private readonly name: string;
	private readonly phone: string | null;
	private readonly rg: string | null;

	constructor(properties: DtoProperties) {
		this.id = properties.id;
		this.address = properties.address;
		this.birthday = properties.birthday;
		this.cpf = properties.cpf;
		this.createDate = properties.createDate;
		this.email = properties.email;
		this.gender = properties.gender;
		this.name = properties.name;
		this.phone = properties.phone;
		this.rg = properties.rg;
	}
	static map(entity: User): UserViewModel {
		return new UserViewModel({
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
		});
	}

	static mapCollection(entities: User[]): UserViewModel[] {
		return entities.map(entity => UserViewModel.map(entity));
	}
}

type DtoProperties = {
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
};
