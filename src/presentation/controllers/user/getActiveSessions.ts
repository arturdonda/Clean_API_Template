import { IGetActiveSessions } from '@/domain/usecases/user';
import { SessionViewModel } from '@/presentation/viewModels';
import { Controller, HttpRequest, HttpResponse, ok, internalServerError } from '@/presentation/protocols';

export class GetActiveSessionsController implements Controller {
	constructor(private readonly getActiveSessionsService: IGetActiveSessions) {}

	handle = async (request: HttpRequest): Promise<HttpResponse<SessionViewModel[]>> => {
		try {
			const sessions = await this.getActiveSessionsService.exec({ userId: request.userId });

			return ok({ message: 'Sessões retornadas com sucesso.', result: SessionViewModel.mapCollection(sessions) });
		} catch (error) {
			return internalServerError({ message: 'Erro ao retornar sessões.', result: error });
		}
	};
}
