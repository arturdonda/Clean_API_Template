import { makeUpdateForgottenPasswordController } from '@main/factories/user';
import { UpdateForgottenPasswordController } from '@presentation/controllers/user';

jest.mock('@presentation/controllers/user');

describe('UpdateForgottenPassword Controller Factory', () => {
	it('should call UpdateForgottenPassword Controller', () => {
		makeUpdateForgottenPasswordController();

		expect(UpdateForgottenPasswordController).toHaveBeenCalledTimes(1);
	});
});
