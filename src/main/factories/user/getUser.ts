import { Controller } from '@presentation/protocols';
import { GetUserController } from '@presentation/controllers/user';
import { getUserService } from '@main/factories/services';

export const makeGetUserController = (): Controller => new GetUserController(getUserService);
