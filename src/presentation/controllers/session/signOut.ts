import { IRevokeSession } from '@domain/usecases/session';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { ok, errorHandler } from '@presentation/helpers';

export class SignOutController implements Controller {
	constructor(private readonly revokeSessionService: IRevokeSession) {}

	handle = async (request: HttpRequest): Promise<HttpResponse<null>> => {
		try {
			await this.revokeSessionService.exec({ userId: request.userId, sessionToken: request.cookies?.sessionToken, ipAddress: request.ip });

			return ok({ message: 'Sessão finalizada com sucesso.', result: null });
		} catch (error) {
			return errorHandler(error, 'Erro ao finalizar sessão.');
		}
	};
}
