import { makeUpdatePasswordController } from '@main/factories/user';
import { UpdatePasswordController } from '@presentation/controllers/user';

jest.mock('@presentation/controllers/user');

describe('UpdatePassword Controller Factory', () => {
	it('should call UpdatePassword Controller', () => {
		makeUpdatePasswordController();

		expect(UpdatePasswordController).toHaveBeenCalledTimes(1);
	});
});
