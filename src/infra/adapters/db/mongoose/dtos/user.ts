import { User } from '@/domain/entities/classes';
import { IUser } from '@/infra/adapters/db/mongoose/interfaces';
import { makeSession } from '.';

export const makeUser = (dbUser: IUser): User => {
	const user = new User({
		id: dbUser.id,
		address: dbUser.address,
		birthday: dbUser.birthday,
		confirmationCode: dbUser.confirmationCode,
		cpf: dbUser.cpf,
		createDate: dbUser.createDate,
		email: dbUser.email,
		gender: dbUser.gender,
		name: dbUser.name,
		password: dbUser.password,
		phone: dbUser.phone,
		rg: dbUser.rg,
	});

	user.status = dbUser.status;

	dbUser.sessions.forEach(session => user.addSession(makeSession(session)));

	return user;
};
