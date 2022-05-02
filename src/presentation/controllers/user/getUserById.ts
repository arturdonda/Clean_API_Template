import { IGetUserById } from '@domain/usecases/user';
import { UserViewModel } from '@presentation/viewModels';
import { MissingParamError } from '@presentation/errors';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { ok, errorHandler } from '@presentation/helpers';

export class GetUserByIdController implements Controller {
	constructor(private readonly getUserByIdService: IGetUserById) {}

	async handle(request: HttpRequest): Promise<HttpResponse<UserViewModel>> {
		try {
			if (!request.query?.userId) throw new MissingParamError('userId');

			const user = await this.getUserByIdService.exec({ userId: request.query.userId });

			return ok({ message: 'Usuário retornado com sucesso.', result: UserViewModel.map(user) });
		} catch (error) {
			return errorHandler(error, 'Erro ao retornar usuário.');
		}
	}
}
