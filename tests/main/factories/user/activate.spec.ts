import { makeActivateUserController } from '@main/factories/user';
import { ActivateUserController } from '@presentation/controllers/user';

jest.mock('@presentation/controllers/user');

describe('ActivateUser Controller Factory', () => {
	it('should call ActivateUser Controller', () => {
		makeActivateUserController();

		expect(ActivateUserController).toHaveBeenCalledTimes(1);
	});
});
