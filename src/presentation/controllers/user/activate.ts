import { IActivate } from '@/domain/usecases/user';
import { MissingParamError } from '@/presentation/errors';
import { Controller, HttpRequest, HttpResponse, ok, badRequest, internalServerError } from '@/presentation/protocols';

export class ActivateUserController implements Controller {
	constructor(private readonly activateService: IActivate) {}

	handle = async (request: HttpRequest): Promise<HttpResponse<null>> => {
		try {
			if (!request.body.confirmationCode) throw new MissingParamError('confirmationCode');

			await this.activateService.exec({ confirmationCode: request.body.confirmationCode });

			return ok({ message: 'Usuário ativado com sucesso', result: null });
		} catch (error) {
			return (error instanceof MissingParamError ? badRequest : internalServerError)({ message: 'Erro ao ativar usuário', result: error });
		}
	};
}
