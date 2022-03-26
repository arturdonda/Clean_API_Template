import { IUpdatePassword } from '@domain/usecases/user';
import { MissingParamError } from '@presentation/errors';
import { Controller, HttpRequest, HttpResponse, ok, badRequest, internalServerError } from '@presentation/protocols';

export class UpdatePasswordController implements Controller {
	constructor(private readonly updatePasswordService: IUpdatePassword) {}

	handle = async (request: HttpRequest): Promise<HttpResponse<null>> => {
		try {
			if (!request.body.password) throw new MissingParamError('password');
			if (!request.body.confirmationPassword) throw new MissingParamError('confirmationPassword');

			await this.updatePasswordService.exec({
				userId: request.userId,
				password: request.body.password,
				confirmationPassword: request.body.confirmationPassword,
			});

			return ok({ message: 'Senha atualizada com sucesso.', result: null });
		} catch (error) {
			return (error instanceof MissingParamError ? badRequest : internalServerError)({ message: 'Erro ao atualizar senha.', result: error });
		}
	};
}
