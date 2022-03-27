import { Controller } from '@presentation/protocols';
import { GetUserMeController } from '@presentation/controllers/user';
import { getUserByIdService } from '@main/factories/services';

export const makeGetUserMeController = (): Controller => new GetUserMeController(getUserByIdService);
