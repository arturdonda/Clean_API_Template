import { makeForgotPasswordController } from '@main/factories/user';
import { ForgotPasswordController } from '@presentation/controllers/user';

jest.mock('@presentation/controllers/user');

describe('ForgotPassword Controller Factory', () => {
	it('should call ForgotPassword Controller', () => {
		makeForgotPasswordController();

		expect(ForgotPasswordController).toHaveBeenCalledTimes(1);
	});
});
