import { User } from '@domain/entities';
import { IUpdateOptionalData } from '@domain/usecases/user';
import { IUserRepository } from '@application/protocols/repositories';
import { UserNotFoundError, UserRegisteredError } from '@application/errors';

export class UpdateOptionalData implements IUpdateOptionalData {
	constructor(private readonly userRepository: IUserRepository) {}

	exec = async ({ userId, address, birthday, cpf, gender, phone, rg }: IUpdateOptionalData.Params): Promise<IUpdateOptionalData.Result> => {
		const validId = User.validadeId(userId);

		const user = await this.userRepository.getById(validId);

		if (!user) throw new UserNotFoundError();

		if (address) user.address = User.validateAddress(address);
		if (birthday) user.birthday = User.validateBirthday(birthday);
		if (gender) user.gender = gender as any;
		if (phone) user.phone = User.validatePhone(phone);

		if (cpf) {
			const validCpf = User.validateCpf(cpf);

			const userExists = !!(await this.userRepository.getByCpf(validCpf));
			if (userExists) throw new UserRegisteredError('CPF');

			user.cpf = validCpf;
		}

		if (rg) {
			const validRg = User.validateRg(rg);

			const userExists = !!(await this.userRepository.getByRg(validRg));
			if (userExists) throw new UserRegisteredError('RG');

			user.rg = validRg;
		}

		return (await this.userRepository.update(user)) as IUpdateOptionalData.Result;
	};
}
