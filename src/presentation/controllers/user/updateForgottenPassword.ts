import { IUpdateForgottenPassword } from '@/domain/usecases/user';
import { MissingParamError } from '@/presentation/errors';
import { Controller, HttpRequest, HttpResponse, ok, badRequest, internalServerError } from '@/presentation/protocols';

export class UpdateForgottenPasswordController implements Controller {
	constructor(private readonly updateForgottenPasswordService: IUpdateForgottenPassword) {}

	handle = async (request: HttpRequest): Promise<HttpResponse<null>> => {
		try {
			if (!request.body.resetToken) throw new MissingParamError('resetToken');
			if (!request.body.password) throw new MissingParamError('password');
			if (!request.body.confirmationPassword) throw new MissingParamError('confirmationPassword');

			await this.updateForgottenPasswordService.exec({
				resetToken: request.body.resetToken,
				password: request.body.password,
				confirmationPassword: request.body.confirmationPassword,
			});

			return ok({ message: 'Senha atualizada com sucesso.', result: null });
		} catch (error) {
			return (error instanceof MissingParamError ? badRequest : internalServerError)({ message: 'Erro ao atualizar senha.', result: error });
		}
	};
}
