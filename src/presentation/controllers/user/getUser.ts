import { IGetUser } from '@/domain/usecases/user';
import { UserViewModel } from '@/presentation/viewModels';
import { Controller, HttpRequest, HttpResponse, ok, internalServerError } from '@/presentation/protocols';

export class GetUserController implements Controller {
	constructor(private readonly getUserService: IGetUser) {}

	handle = async (request: HttpRequest): Promise<HttpResponse<UserViewModel>> => {
		try {
			const user = await this.getUserService.exec({ userId: request.userId });

			return ok({ message: 'Usuário retornado com sucesso.', result: UserViewModel.map(user) });
		} catch (error) {
			return internalServerError({ message: 'Erro ao retornar usuário.', result: error });
		}
	};
}
