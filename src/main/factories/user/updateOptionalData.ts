import { Controller } from '@presentation/protocols';
import { UpdateOptionalDataController } from '@presentation/controllers/user';
import { updateOptionalData } from '@main/factories/services';

export const makeUpdateOptionalDataController = (): Controller => new UpdateOptionalDataController(updateOptionalData);
