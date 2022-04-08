import { IActivate } from '@domain/usecases/user';
import { MissingParamError } from '@presentation/errors';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { ok, errorHandler } from '@presentation/helpers';

export class ActivateUserController implements Controller {
	constructor(private readonly activateService: IActivate) {}

	handle = async (request: HttpRequest): Promise<HttpResponse<null>> => {
		try {
			if (!request.query?.confirmationCode) throw new MissingParamError('confirmationCode');

			await this.activateService.exec({ confirmationCode: request.query.confirmationCode });

			return ok({ message: 'Usuário ativado com sucesso.', result: null });
		} catch (error) {
			return errorHandler(error, 'Erro ao ativar usuário.');
		}
	};
}
