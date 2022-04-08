import { IGetUserById } from '@domain/usecases/user';
import { UserViewModel } from '@presentation/viewModels';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { ok, errorHandler } from '@presentation/helpers';

export class GetUserMeController implements Controller {
	constructor(private readonly getUserByIdService: IGetUserById) {}

	handle = async (request: HttpRequest): Promise<HttpResponse<UserViewModel>> => {
		try {
			const user = await this.getUserByIdService.exec({ userId: request.userId });

			return ok({ message: 'Usuário retornado com sucesso.', result: UserViewModel.map(user) });
		} catch (error) {
			return errorHandler(error, 'Erro ao retornar usuário.');
		}
	};
}
