import {
	activateUserService,
	createSessionService,
	forgotPasswordService,
	getActiveSessionsService,
	getAllUsersService,
	getUserByIdService,
	renewAccessService,
	revokeSessionService,
	signInService,
	signUpService,
	updateForgottenPasswordService,
	updateOptionalData,
	updatePasswordService,
} from '@main/factories/services';
import { CreateSession, RenewAccess, RevokeSession } from '@application/usecases/session';
import {
	Activate,
	ForgotPassword,
	GetActiveSessions,
	GetUserById,
	GetAllUsers,
	SignIn,
	SignUp,
	UpdateForgottenPassword,
	UpdateOptionalData,
	UpdatePassword,
} from '@application/usecases/user';

jest.mock('@application/usecases/session');
jest.mock('@application/usecases/user');

describe('Services factories', () => {
	it('should create CreateSession service', () => {
		createSessionService;

		expect(CreateSession).toHaveBeenCalledTimes(1);
	});

	it('should create RenewAccess service', () => {
		renewAccessService;

		expect(RenewAccess).toHaveBeenCalledTimes(1);
	});

	it('should create RevokeSession service', () => {
		revokeSessionService;

		expect(RevokeSession).toHaveBeenCalledTimes(1);
	});

	it('should create Activate service', () => {
		activateUserService;

		expect(Activate).toHaveBeenCalledTimes(1);
	});

	it('should create ForgotPassword service', () => {
		forgotPasswordService;

		expect(ForgotPassword).toHaveBeenCalledTimes(1);
	});

	it('should create GetActiveSessions service', () => {
		getActiveSessionsService;

		expect(GetActiveSessions).toHaveBeenCalledTimes(1);
	});

	it('should create GetUserById service', () => {
		getUserByIdService;

		expect(GetUserById).toHaveBeenCalledTimes(1);
	});

	it('should create GetAllUsers service', () => {
		getAllUsersService;

		expect(GetAllUsers).toHaveBeenCalledTimes(1);
	});

	it('should create SignIn service', () => {
		signInService;

		expect(SignIn).toHaveBeenCalledTimes(1);
	});

	it('should create SignUp service', () => {
		signUpService;

		expect(SignUp).toHaveBeenCalledTimes(1);
	});

	it('should create UpdateForgottenPassword service', () => {
		updateForgottenPasswordService;

		expect(UpdateForgottenPassword).toHaveBeenCalledTimes(1);
	});

	it('should create UpdateOptionalData service', () => {
		updateOptionalData;

		expect(UpdateOptionalData).toHaveBeenCalledTimes(1);
	});

	it('should create UpdatePassword service', () => {
		updatePasswordService;

		expect(UpdatePassword).toHaveBeenCalledTimes(1);
	});
});
