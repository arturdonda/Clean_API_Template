import { Controller } from '@presentation/protocols';
import { ActivateUserController } from '@presentation/controllers/user';
import { activateUserService } from '@main/factories/services';

export const makeActivateUserController = (): Controller => new ActivateUserController(activateUserService);
