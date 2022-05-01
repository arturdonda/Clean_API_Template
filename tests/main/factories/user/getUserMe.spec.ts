import { makeGetUserMeController } from '@main/factories/user';
import { GetUserMeController } from '@presentation/controllers/user';

jest.mock('@presentation/controllers/user');

describe('GetUserMe Controller Factory', () => {
	it('should call GetUserMe Controller', () => {
		makeGetUserMeController();

		expect(GetUserMeController).toHaveBeenCalledTimes(1);
	});
});
