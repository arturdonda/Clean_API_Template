import { makeGetAllUsersController } from '@main/factories/user';
import { GetAllUsersController } from '@presentation/controllers/user';

jest.mock('@presentation/controllers/user');

describe('GetAllUsers Controller Factory', () => {
	it('should call GetAllUsers Controller', () => {
		makeGetAllUsersController();

		expect(GetAllUsersController).toHaveBeenCalledTimes(1);
	});
});
