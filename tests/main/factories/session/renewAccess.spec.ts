import { makeRenewAccessController } from '@main/factories/session';
import { RenewAccessController } from '@presentation/controllers/session';

jest.mock('@presentation/controllers/session');

describe('RenewAccess Controller Factory', () => {
	it('should call RenewAccess Controller', () => {
		makeRenewAccessController();

		expect(RenewAccessController).toHaveBeenCalledTimes(1);
	});
});
