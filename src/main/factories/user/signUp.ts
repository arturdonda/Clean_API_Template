import { Controller } from '@presentation/protocols';
import { SignUpController } from '@presentation/controllers/user';
import { signUpService } from '@main/factories/services';

export const makeSignUpController = (): Controller => new SignUpController(signUpService);
