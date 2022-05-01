import { makeSignUpController } from '@main/factories/user';
import { SignUpController } from '@presentation/controllers/user';

jest.mock('@presentation/controllers/user');

describe('SignUp Controller Factory', () => {
	it('should call SignUp Controller', () => {
		makeSignUpController();

		expect(SignUpController).toHaveBeenCalledTimes(1);
	});
});
