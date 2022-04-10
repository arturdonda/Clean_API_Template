import { IRenewAccess } from '@domain/usecases/session';
import { MissingSessionTokenError } from '@presentation/errors';
import { ok, errorHandler } from '@presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';

export class RenewAccessController implements Controller {
	constructor(private readonly renewAccessService: IRenewAccess) {}

	handle = async (request: HttpRequest): Promise<HttpResponse<null>> => {
		try {
			if (!request.cookies?.sessionToken) throw new MissingSessionTokenError();
			const accessToken = this.renewAccessService.exec(request.cookies.sessionToken);

			return ok({
				message: 'Acesso renovado com sucesso.',
				result: null,
				headers: { authorization: `Bearer ${accessToken}` },
			});
		} catch (error) {
			return errorHandler(error, 'Erro ao renovar acesso.');
		}
	};
}
