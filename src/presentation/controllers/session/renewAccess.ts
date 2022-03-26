import { IRenewAccess } from '@domain/usecases/session';
import { Controller, HttpRequest, HttpResponse, ok, internalServerError } from '@presentation/protocols';

export class RenewAccessController implements Controller {
	constructor(private readonly renewAccessService: IRenewAccess) {}

	handle = async (request: HttpRequest): Promise<HttpResponse<null>> => {
		try {
			const accessToken = this.renewAccessService.exec(request.cookies.refreshToken);

			return ok({
				message: 'Acesso renovado com sucesso',
				result: null,
				headers: { authorization: `Bearer ${accessToken}` },
			});
		} catch (error) {
			return internalServerError({ message: 'Erro ao renovar acesso', result: error });
		}
	};
}
