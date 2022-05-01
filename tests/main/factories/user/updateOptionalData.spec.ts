import { makeUpdateOptionalDataController } from '@main/factories/user';
import { UpdateOptionalDataController } from '@presentation/controllers/user';

jest.mock('@presentation/controllers/user');

describe('UpdateOptionalData Controller Factory', () => {
	it('should call UpdateOptionalData Controller', () => {
		makeUpdateOptionalDataController();

		expect(UpdateOptionalDataController).toHaveBeenCalledTimes(1);
	});
});
