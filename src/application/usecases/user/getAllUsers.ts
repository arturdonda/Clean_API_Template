import { IGetAllUsers } from '@domain/usecases/user';
import { IUserRepository } from '@application/protocols/repositories';

export class GetAllUsers implements IGetAllUsers {
	constructor(private readonly userRepository: IUserRepository) {}

	exec = async (): Promise<IGetAllUsers.Result> => {
		return await this.userRepository.getAll();
	};
}
