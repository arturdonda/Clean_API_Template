import { makeGetUserByIdController } from '@main/factories/user';
import { GetUserByIdController } from '@presentation/controllers/user';

jest.mock('@presentation/controllers/user');

describe('GetUserById Controller Factory', () => {
	it('should call GetUserById Controller', () => {
		makeGetUserByIdController();

		expect(GetUserByIdController).toHaveBeenCalledTimes(1);
	});
});
