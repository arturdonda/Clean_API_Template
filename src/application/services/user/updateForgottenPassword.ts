import { IUpdateForgottenPassword, IUpdatePassword } from '@/domain/usecases/user';
import { ITokenService } from '@/application/protocols/utils';

export class UpdateForgottenPassword implements IUpdateForgottenPassword {
	constructor(private readonly tokenService: ITokenService, private readonly updatePassword: IUpdatePassword) {}

	exec = async ({ resetToken, password, confirmationPassword }: IUpdateForgottenPassword.Params): Promise<IUpdateForgottenPassword.Result> => {
		const { audience: userId } = this.tokenService.validate(resetToken);

		await this.updatePassword.exec({
			userId,
			password,
			confirmationPassword,
		});
	};
}
