import { IUserRepository } from '@/application/protocols/repositories';
import mongoDB from '@/infra/adapters/db/mongoose';
import { makeUser } from '@/infra/adapters/db/mongoose/dtos';
import { DatabaseError } from '@/infra/errors';

export class UserRepository implements IUserRepository {
	private readonly database = mongoDB;

	getById = async (userId: string): Promise<IUserRepository.User | null> => {
		return this.database.User.findById(userId)
			.exec()
			.then(user => (user ? makeUser(user) : null))
			.catch(error => {
				throw new DatabaseError(error);
			});
	};

	getByConfirmationCode = async (confirmationCode: string): Promise<IUserRepository.User | null> => {
		return this.database.User.findOne({ confirmationCode })
			.exec()
			.then(user => (user ? makeUser(user) : null))
			.catch(error => {
				throw new DatabaseError(error);
			});
	};

	getByEmail = async (email: string): Promise<IUserRepository.User | null> => {
		return this.database.User.findOne({ email })
			.exec()
			.then(user => (user ? makeUser(user) : null))
			.catch(error => {
				throw new DatabaseError(error);
			});
	};

	getByCpf = async (cpf: string): Promise<IUserRepository.User | null> => {
		return this.database.User.findOne({ cpf })
			.exec()
			.then(user => (user ? makeUser(user) : null))
			.catch(error => {
				throw new DatabaseError(error);
			});
	};

	getByRg = async (rg: string): Promise<IUserRepository.User | null> => {
		return this.database.User.findOne({ rg })
			.exec()
			.then(user => (user ? makeUser(user) : null))
			.catch(error => {
				throw new DatabaseError(error);
			});
	};

	create = async (user: IUserRepository.User): Promise<IUserRepository.User> => {
		return this.database.User.create({
			address: user.address,
			birthday: user.birthday,
			confirmationCode: user.confirmationCode,
			cpf: user.cpf,
			createDate: user.createDate,
			email: user.email,
			gender: user.gender,
			name: user.name,
			password: user.password,
			phone: user.phone,
			rg: user.rg,
			status: user.status,
		})
			.then(user => makeUser(user))
			.catch(error => {
				throw new DatabaseError(error);
			});
	};

	update = async (user: IUserRepository.User): Promise<IUserRepository.User | null> => {
		return this.database.User.findByIdAndUpdate(
			user.id,
			{
				$set: {
					address: user.address,
					birthday: user.birthday,
					cpf: user.cpf,
					email: user.email,
					gender: user.gender,
					name: user.name,
					password: user.password,
					phone: user.phone,
					rg: user.rg,
					status: user.status,
					sessions: user.sessions.map(session => ({
						token: session.token,
						expiredAt: session.expiredAt,
						createdAt: session.createdAt,
						revokedAt: session.revokedAt,
						createdBy: {
							ip: session.createdBy.ip,
							countryName: session.createdBy.countryName,
							countryCode: session.createdBy.countryCode,
							countryFlag: session.createdBy.countryFlag,
							stateName: session.createdBy.stateName,
							stateCode: session.createdBy.stateCode,
							city: session.createdBy.city,
							latitude: session.createdBy.latitude,
							longitude: session.createdBy.longitude,
						},
						revokedBy: session.revokedBy
							? {
									ip: session.revokedBy.ip,
									countryName: session.revokedBy.countryName,
									countryCode: session.revokedBy.countryCode,
									countryFlag: session.revokedBy.countryFlag,
									stateName: session.revokedBy.stateName,
									stateCode: session.revokedBy.stateCode,
									city: session.revokedBy.city,
									latitude: session.revokedBy.latitude,
									longitude: session.revokedBy.longitude,
							  }
							: null,
					})),
				},
			},
			{ new: true }
		)
			.exec()
			.then(updatedUser => (updatedUser ? makeUser(updatedUser) : null))
			.catch(error => {
				throw new DatabaseError(error);
			});
	};
}
