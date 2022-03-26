import { User } from '@domain/entities';

export interface IUpdateOptionalData {
	exec: ({ userId, address, birthday, cpf, gender, phone, rg }: IUpdateOptionalData.Params) => Promise<IUpdateOptionalData.Result>;
}

export namespace IUpdateOptionalData {
	export type Params = {
		userId: string;
		address?: string;
		birthday?: Date;
		cpf?: string;
		gender?: string;
		phone?: string;
		rg?: string;
	};

	export type Result = User;
}
