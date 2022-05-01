import { makeSignInController } from '@main/factories/user';
import { SignInController } from '@presentation/controllers/user';

jest.mock('@presentation/controllers/user');

describe('SignIn Controller Factory', () => {
	it('should call SignIn Controller', () => {
		makeSignInController();

		expect(SignInController).toHaveBeenCalledTimes(1);
	});
});
