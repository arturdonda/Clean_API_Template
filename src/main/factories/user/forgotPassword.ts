import { Controller } from '@presentation/protocols';
import { ForgotPasswordController } from '@presentation/controllers/user';
import { forgotPasswordService } from '@main/factories/services';

export const makeForgotPasswordController = (): Controller => new ForgotPasswordController(forgotPasswordService);
