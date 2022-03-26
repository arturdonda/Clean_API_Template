import { IRevokeSession } from '@/domain/usecases/session';
import { MissingParamError } from '@/presentation/errors';
import { Controller, HttpRequest, HttpResponse, ok, badRequest, internalServerError } from '@/presentation/protocols';

export class RevokeSessionController implements Controller {
	constructor(private readonly revokeSessionService: IRevokeSession) {}

	handle = async (request: HttpRequest): Promise<HttpResponse<null>> => {
		try {
			if (!request.body.sessionToken) throw new MissingParamError('sessionToken');

			await this.revokeSessionService.exec({ sessionToken: request.body.sessionToken, ipAddress: request.ip });

			return ok({ message: 'Sessão finalizada com sucesso', result: null });
		} catch (error) {
			return (error instanceof MissingParamError ? badRequest : internalServerError)({ message: 'Erro ao finalizar sessão', result: error });
		}
	};
}
