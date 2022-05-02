import { IUpdateOptionalData } from '@domain/usecases/user';
import { UserViewModel } from '@presentation/viewModels';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { ok, errorHandler } from '@presentation/helpers';

export class UpdateOptionalDataController implements Controller {
	constructor(private readonly updateOptionalDataService: IUpdateOptionalData) {}

	async handle(request: HttpRequest): Promise<HttpResponse<UserViewModel>> {
		try {
			const user = await this.updateOptionalDataService.exec({
				userId: request.userId,
				...request.body,
			});

			return ok({ message: 'Dados atualizados com sucesso.', result: UserViewModel.map(user) });
		} catch (error) {
			return errorHandler(error, 'Erro ao atualizar dados.');
		}
	}
}
