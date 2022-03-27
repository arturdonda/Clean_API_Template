import { Controller } from '@presentation/protocols';
import { SignOutController } from '@presentation/controllers/session';
import { revokeSessionService } from '@main/factories/services';

export const makeSignOutController = (): Controller => new SignOutController(revokeSessionService);
