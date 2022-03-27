import { Controller } from '@presentation/protocols';
import { RevokeSessionController } from '@presentation/controllers/session';
import { revokeSessionService } from '@main/factories/services';

export const makeRevokeSessionController = (): Controller => new RevokeSessionController(revokeSessionService);
