import { Controller } from '@presentation/protocols';
import { GetActiveSessionsController } from '@presentation/controllers/user';
import { getActiveSessionsService } from '@main/factories/services';

export const makeGetActiveSessionsController = (): Controller => new GetActiveSessionsController(getActiveSessionsService);
