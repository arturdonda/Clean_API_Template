import { IRevokeSession } from '@domain/usecases/session';
import { MissingParamError } from '@presentation/errors';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { ok, errorHandler } from '@presentation/helpers';

export class RevokeSessionController implements Controller {
	constructor(private readonly revokeSessionService: IRevokeSession) {}

	async handle(request: HttpRequest): Promise<HttpResponse<null>> {
		try {
			if (!request.query?.sessionToken) throw new MissingParamError('sessionToken');

			await this.revokeSessionService.exec({ userId: request.userId, sessionToken: request.query.sessionToken, ipAddress: request.ip });

			return ok({ message: 'Sessão finalizada com sucesso.', result: null });
		} catch (error) {
			return errorHandler(error, 'Erro ao finalizar sessão.');
		}
	}
}
