import { IForgotPassword } from '@domain/usecases/user';
import { MissingParamError } from '@presentation/errors';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { ok, errorHandler } from '@presentation/helpers';

export class ForgotPasswordController implements Controller {
	constructor(private readonly forgotPasswordService: IForgotPassword) {}

	async handle(request: HttpRequest): Promise<HttpResponse<null>> {
		try {
			if (!request.body?.email) throw new MissingParamError('email');

			await this.forgotPasswordService.exec({ email: request.body.email });

			return ok({ message: 'E-mail para alteração de senha enviado.', result: null });
		} catch (error) {
			return errorHandler(error, 'Erro ao enviar e-mail de alteração de senha.');
		}
	}
}
