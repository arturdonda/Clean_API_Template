import { IGetActiveSessions } from '@domain/usecases/user';
import { SessionViewModel } from '@presentation/viewModels';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { ok, errorHandler } from '@presentation/helpers';

export class GetActiveSessionsController implements Controller {
	constructor(private readonly getActiveSessionsService: IGetActiveSessions) {}

	async handle(request: HttpRequest): Promise<HttpResponse<SessionViewModel[]>> {
		try {
			const sessions = await this.getActiveSessionsService.exec({ userId: request.userId });

			return ok({ message: 'Sessões retornadas com sucesso.', result: SessionViewModel.mapCollection(sessions) });
		} catch (error) {
			return errorHandler(error, 'Erro ao retornar sessões.');
		}
	}
}
