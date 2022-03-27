import { IGetUserById } from '@domain/usecases/user';
import { UserViewModel } from '@presentation/viewModels';
import { Controller, HttpRequest, HttpResponse, ok, internalServerError } from '@presentation/protocols';
import { MissingParamError } from '@presentation/errors';

export class GetUserMeController implements Controller {
	constructor(private readonly getUserByIdService: IGetUserById) {}

	handle = async (request: HttpRequest): Promise<HttpResponse<UserViewModel>> => {
		try {
			if (!request.userId) throw new MissingParamError('userId');

			const user = await this.getUserByIdService.exec({ userId: request.userId });

			return ok({ message: 'Usuário retornado com sucesso.', result: UserViewModel.map(user) });
		} catch (error) {
			return internalServerError({ message: 'Erro ao retornar usuário.', result: error });
		}
	};
}