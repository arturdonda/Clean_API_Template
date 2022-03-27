import { Controller } from '@presentation/protocols';
import { UpdatePasswordController } from '@presentation/controllers/user';
import { updatePasswordService } from '@main/factories/services';

export const makeUpdatePasswordController = (): Controller => new UpdatePasswordController(updatePasswordService);
