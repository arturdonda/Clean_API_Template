import { IUpdateOptionalData } from '@/domain/usecases/user';
import { UserViewModel } from '@/presentation/viewModels';
import { Controller, HttpRequest, HttpResponse, ok, internalServerError } from '@/presentation/protocols';

export class UpdateOptionalDataController implements Controller {
	constructor(private readonly updateOptionalDataService: IUpdateOptionalData) {}

	handle = async (request: HttpRequest): Promise<HttpResponse<UserViewModel>> => {
		try {
			const user = await this.updateOptionalDataService.exec({
				userId: request.userId,
				...request.body,
			});

			return ok({ message: 'Dados atualizados com sucesso.', result: UserViewModel.map(user) });
		} catch (error) {
			return internalServerError({ message: 'Erro ao atualizar dados.', result: error });
		}
	};
}
