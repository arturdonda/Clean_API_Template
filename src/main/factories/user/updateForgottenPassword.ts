import { Controller } from '@presentation/protocols';
import { UpdateForgottenPasswordController } from '@presentation/controllers/user';
import { updateForgottenPasswordService } from '@main/factories/services';

export const makeUpdateForgottenPasswordController = (): Controller => new UpdateForgottenPasswordController(updateForgottenPasswordService);
