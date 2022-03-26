import { Document } from 'mongoose';
import { ISession } from '.';

export interface IUser extends Document {
	address?: string;
	birthday?: Date;
	confirmationCode: string;
	cpf?: string;
	createDate: Date;
	email: string;
	gender?: 'M' | 'F' | 'O';
	name: string;
	password: string;
	phone?: string;
	rg?: string;
	status: 'Pending' | 'Active' | 'Inactive';
	sessions: ISession[];
}
