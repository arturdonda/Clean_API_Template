import { IForgotPassword } from '@/domain/usecases/user';
import { MissingParamError } from '@/presentation/errors';
import { Controller, HttpRequest, HttpResponse, ok, badRequest, internalServerError } from '@/presentation/protocols';

export class ForgotPasswordController implements Controller {
	constructor(private readonly forgotPasswordService: IForgotPassword) {}

	handle = async (request: HttpRequest): Promise<HttpResponse<null>> => {
		try {
			if (!request.body.email) throw new MissingParamError('email');

			await this.forgotPasswordService.exec({ email: request.body.email });

			return ok({ message: 'E-mail para alteração de senha enviado.', result: null });
		} catch (error) {
			return (error instanceof MissingParamError ? badRequest : internalServerError)({
				message: 'Erro ao enviar e-mail de alteração de senha.',
				result: error,
			});
		}
	};
}
