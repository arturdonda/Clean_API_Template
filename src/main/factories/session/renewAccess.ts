import { Controller } from '@presentation/protocols';
import { RenewAccessController } from '@presentation/controllers/session';
import { renewAccessService } from '@main/factories/services';

export const makeRenewAccessController = (): Controller => new RenewAccessController(renewAccessService);
