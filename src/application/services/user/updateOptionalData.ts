import { User } from '@/domain/entities/classes';
import { IUpdateOptionalData } from '@/domain/usecases/user';
import { UserNotFoundError, UserRegisteredError } from '@/application/errors';
import { IUserRepository } from '@/application/protocols/repositories';

export class UpdateOptionalData implements IUpdateOptionalData {
	constructor(private readonly userRepository: IUserRepository) {}

	exec = async ({ userId, address, birthday, cpf, gender, phone, rg }: IUpdateOptionalData.Params): Promise<IUpdateOptionalData.Result> => {
		const user = await this.userRepository.getById(userId);

		if (!user) throw new UserNotFoundError();

		if (address) user.address = address;
		if (birthday) user.birthday = birthday;
		if (gender) user.gender = gender as any;
		if (phone) user.phone = phone;

		if (cpf) {
			const userExists = !!(await this.userRepository.getByCpf(User.validateCpf(cpf)));
			if (userExists) throw new UserRegisteredError('CPF');

			user.cpf = cpf;
		}

		if (rg) {
			const userExists = !!(await this.userRepository.getByRg(User.validateRg(rg)));
			if (userExists) throw new UserRegisteredError('RG');

			user.rg = rg;
		}

		return (await this.userRepository.update(user)) as IUpdateOptionalData.Result;
	};
}
