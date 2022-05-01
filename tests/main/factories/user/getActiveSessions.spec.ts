import { makeGetActiveSessionsController } from '@main/factories/user';
import { GetActiveSessionsController } from '@presentation/controllers/user';

jest.mock('@presentation/controllers/user');

describe('GetActiveSessions Controller Factory', () => {
	it('should call GetActiveSessions Controller', () => {
		makeGetActiveSessionsController();

		expect(GetActiveSessionsController).toHaveBeenCalledTimes(1);
	});
});
