import { IRevokeSession } from '@domain/usecases/session';
import { Controller, HttpRequest, HttpResponse, ok, internalServerError } from '@presentation/protocols';

export class SignOutController implements Controller {
	constructor(private readonly revokeSessionService: IRevokeSession) {}

	handle = async (request: HttpRequest): Promise<HttpResponse<null>> => {
		try {
			await this.revokeSessionService.exec({ userId: request.userId, sessionToken: request.cookies?.refreshToken, ipAddress: request.ip });

			return ok({ message: 'Sessão finalizada com sucesso', result: null });
		} catch (error) {
			return internalServerError({ message: 'Erro ao finalizar sessão', result: error });
		}
	};
}
