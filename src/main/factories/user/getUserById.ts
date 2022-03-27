import { Controller } from '@presentation/protocols';
import { GetUserByIdController } from '@presentation/controllers/user';
import { getUserByIdService } from '@main/factories/services';

export const makeGetUserByIdController = (): Controller => new GetUserByIdController(getUserByIdService);
