import { IUpdateOptionalData } from '@/domain/usecases/user';
import { UserNotFoundError } from '@/application/protocols/errors';
import { IUserRepository } from '@/application/protocols/repositories';

export class UpdateOptionalData implements IUpdateOptionalData {
	constructor(private readonly userRepository: IUserRepository) {}

	exec = async ({ userId, address, birthday, cpf, gender, phone, rg }: IUpdateOptionalData.Params): Promise<IUpdateOptionalData.Result> => {
		const user = await this.userRepository.getById(userId);

		if (!user) throw new UserNotFoundError();

		if (address) user.address = address;
		if (birthday) user.birthday = birthday;
		if (cpf) user.cpf = cpf;
		if (gender) user.gender = gender as any;
		if (phone) user.phone = phone;
		if (rg) user.rg = rg;

		return (await this.userRepository.update(user)) as IUpdateOptionalData.Result;
	};
}
