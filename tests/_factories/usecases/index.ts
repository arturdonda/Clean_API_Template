import { IUserRepository } from '@application/protocols/repositories';
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
import { mockEmailService, mockHashService, mockIpService, mockTokenService, mockUuidService } from '@tests/_factories/adapters';

export const makeCreateSession = () => new CreateSession(mockTokenService, mockIpService);
export const makeRenewAccess = (userRepository: IUserRepository) => new RenewAccess(mockTokenService, mockTokenService, userRepository);
export const makeRevokeSession = (userRepository: IUserRepository) => new RevokeSession(userRepository, mockIpService);

export const makeActivate = (userRepository: IUserRepository) => new Activate(userRepository);
export const makeForgotPassword = (userRepository: IUserRepository) => new ForgotPassword(userRepository, mockTokenService, mockEmailService);
export const makeGetActiveSessions = (userRepository: IUserRepository) => new GetActiveSessions(userRepository);
export const makeGetAllUsers = (userRepository: IUserRepository) => new GetAllUsers(userRepository);
export const makeGetUserById = (userRepository: IUserRepository) => new GetUserById(userRepository);
export const makeSignIn = (userRepository: IUserRepository) =>
	new SignIn(userRepository, mockHashService, makeCreateSession(), makeRenewAccess(userRepository));
export const makeSignUp = (userRepository: IUserRepository) => new SignUp(userRepository, mockUuidService, mockHashService, mockEmailService);
export const makeUpdateForgottenPassword = (userRepository: IUserRepository) =>
	new UpdateForgottenPassword(mockTokenService, makeUpdatePassword(userRepository));
export const makeUpdateOptionalData = (userRepository: IUserRepository) => new UpdateOptionalData(userRepository);
export const makeUpdatePassword = (userRepository: IUserRepository) => new UpdatePassword(userRepository, mockHashService, mockEmailService);
