import { ISignUp } from '@domain/usecases/user';
import { UserViewModel } from '@presentation/viewModels';
import { MissingParamError } from '@presentation/errors';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { created, errorHandler } from '@presentation/helpers';

export class SignUpController implements Controller {
	constructor(private readonly signUpService: ISignUp) {}

	handle = async (request: HttpRequest): Promise<HttpResponse<UserViewModel>> => {
		try {
			if (!request.body?.name) throw new MissingParamError('name');
			if (!request.body?.email) throw new MissingParamError('email');
			if (!request.body?.password) throw new MissingParamError('password');
			if (!request.body?.confirmationPassword) throw new MissingParamError('confirmationPassword');

			const user = await this.signUpService.exec({
				name: request.body.name,
				email: request.body.email,
				password: request.body.password,
				confirmationPassword: request.body.confirmationPassword,
			});

			return created({ message: 'Usuário criado com sucesso.', result: UserViewModel.map(user) });
		} catch (error) {
			return errorHandler(error, 'Erro ao criar usuário.');
		}
	};
}
