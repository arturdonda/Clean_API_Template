import { makeRevokeSessionController } from '@main/factories/session';
import { RevokeSessionController } from '@presentation/controllers/session';

jest.mock('@presentation/controllers/session');

describe('RevokeSession Controller Factory', () => {
	it('should call RevokeSession Controller', () => {
		makeRevokeSessionController();

		expect(RevokeSessionController).toHaveBeenCalledTimes(1);
	});
});
