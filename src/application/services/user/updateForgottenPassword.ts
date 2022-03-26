import { IUpdateForgottenPassword, IUpdatePassword } from '@domain/usecases/user';
import { ITokenService } from '@application/protocols/utils';

export class UpdateForgottenPassword implements IUpdateForgottenPassword {
	constructor(private readonly resetTokenService: ITokenService, private readonly updatePassword: IUpdatePassword) {}

	exec = async ({ resetToken, password, confirmationPassword }: IUpdateForgottenPassword.Params): Promise<IUpdateForgottenPassword.Result> => {
		const { audience: userId } = this.resetTokenService.validate(resetToken);

		await this.updatePassword.exec({
			userId,
			password,
			confirmationPassword,
		});
	};
}
