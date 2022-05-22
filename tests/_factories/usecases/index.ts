import { CreateSession, RenewAccess, RevokeSession } from '@application/usecases/session';
import {
	Activate,
	ForgotPassword,
	GetActiveSessions,
	GetAllUsers,
	GetUserById,
	SignIn,
	SignUp,
	UpdateForgottenPassword,
	UpdateOptionalData,
	UpdatePassword,
} from '@application/usecases/user';
import { mockEmailService, mockHashService, mockIpService, mockTokenService, mockUuidService, mockUserRepository } from '@tests/_factories/adapters';

export const createSessionService = new CreateSession(mockTokenService, mockIpService);
export const renewAccessService = new RenewAccess(mockTokenService, mockTokenService, mockUserRepository);
export const revokeSessionService = new RevokeSession(mockUserRepository, mockIpService);

export const activateService = new Activate(mockUserRepository);
export const forgotPasswordService = new ForgotPassword(mockUserRepository, mockTokenService, mockEmailService);
export const getActiveSessionsService = new GetActiveSessions(mockUserRepository);
export const getAllUsersService = new GetAllUsers(mockUserRepository);
export const getUserByIdService = new GetUserById(mockUserRepository);
export const signInService = new SignIn(mockUserRepository, mockHashService, createSessionService, renewAccessService);
export const signUpService = new SignUp(mockUserRepository, mockUuidService, mockHashService, mockEmailService);
export const updateOptionalDataService = new UpdateOptionalData(mockUserRepository);
export const updatePasswordService = new UpdatePassword(mockUserRepository, mockHashService, mockEmailService);
export const updateForgottenPasswordService = new UpdateForgottenPassword(mockTokenService, updatePasswordService);
