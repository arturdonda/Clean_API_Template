import { ISignIn } from '@domain/usecases/user';
import { UserViewModel } from '@presentation/viewModels';
import { MissingParamError } from '@presentation/errors';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { ok, errorHandler } from '@presentation/helpers';

export class SignInController implements Controller {
	constructor(private readonly signInService: ISignIn) {}

	handle = async (request: HttpRequest): Promise<HttpResponse<UserViewModel>> => {
		try {
			if (!request.body?.email) throw new MissingParamError('email');
			if (!request.body?.password) throw new MissingParamError('password');

			const { user, sessionToken, accessToken } = await this.signInService.exec({
				email: request.body.email,
				password: request.body.password,
				ipAddress: request.ip,
			});

			return ok({
				message: 'Usuário logado com sucesso.',
				result: UserViewModel.map(user),
				headers: { authorization: `Bearer ${accessToken}` },
				cookies: { sessionToken: sessionToken },
			});
		} catch (error) {
			return errorHandler(error, 'Erro ao logar usuário.');
		}
	};
}
