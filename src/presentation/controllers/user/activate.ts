import { IActivate } from '@domain/usecases/user';
import { MissingParamError } from '@presentation/errors';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { ok, errorHandler } from '@presentation/helpers';

export class ActivateUserController implements Controller {
	constructor(private readonly activateService: IActivate) {}

	async handle(request: HttpRequest): Promise<HttpResponse<null>> {
		try {
			if (!request.body?.confirmationCode) throw new MissingParamError('confirmationCode');

			await this.activateService.exec({ confirmationCode: request.body.confirmationCode });

			return ok({ message: 'Usuário ativado com sucesso.', result: null });
		} catch (error) {
			return errorHandler(error, 'Erro ao ativar usuário.');
		}
	}
}
