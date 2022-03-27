import { Controller } from '@presentation/protocols';
import { GetAllUsersController } from '@presentation/controllers/user';
import { getAllUsersService } from '@main/factories/services';

export const makeGetAllUsersController = (): Controller => new GetAllUsersController(getAllUsersService);
