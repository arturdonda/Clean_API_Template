import { IGetAllUsers } from '@domain/usecases/user';
import { UserViewModel } from '@presentation/viewModels';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { ok, errorHandler } from '@presentation/helpers';

export class GetAllUsersController implements Controller {
	constructor(private readonly getAllUserService: IGetAllUsers) {}

	handle = async (request: HttpRequest): Promise<HttpResponse<UserViewModel[]>> => {
		try {
			const users = await this.getAllUserService.exec();

			return ok({ message: 'Usuários retornados com sucesso.', result: UserViewModel.mapCollection(users) });
		} catch (error) {
			return errorHandler(error, 'Erro ao retornar usuários.');
		}
	};
}
