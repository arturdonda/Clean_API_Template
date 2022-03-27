import { Controller } from '@presentation/protocols';
import { SignInController } from '@presentation/controllers/user';
import { signInService } from '@main/factories/services';

export const makeSignInController = (): Controller => new SignInController(signInService);
