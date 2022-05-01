import { makeSignOutController } from '@main/factories/session';
import { SignOutController } from '@presentation/controllers/session';

jest.mock('@presentation/controllers/session');

describe('SignOut Controller Factory', () => {
	it('should call SignOut Controller', () => {
		makeSignOutController();

		expect(SignOutController).toHaveBeenCalledTimes(1);
	});
});
