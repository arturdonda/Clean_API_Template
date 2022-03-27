import { EmailService } from '@infra/adapters/email/nodemailer';
import { HashService } from '@infra/adapters/hash/bcrypt';
import { IpService } from '@infra/adapters/ip/ipdata';
import { AccessTokenService, ResetTokenService, SessionTokenService } from '@infra/adapters/token/jsonwebtoken';
import { UuidService } from '@infra/adapters/uuid/crypto';
import { UserRepository } from '@infra/repositories';
import { CreateSession, RenewAccess, RevokeSession } from '@application/services/session';
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
} from '@application/services/user';

const userRepository = new UserRepository();
const emailService = new EmailService();
const passwordHashService = new HashService();
const ipService = new IpService();
const sessionTokenService = new SessionTokenService();
const accessTokenService = new AccessTokenService();
const resetTokenService = new ResetTokenService();
const uuidService = new UuidService();

export const createSessionService = new CreateSession(sessionTokenService, ipService);
export const renewAccessService = new RenewAccess(sessionTokenService, accessTokenService);
export const revokeSessionService = new RevokeSession(sessionTokenService, userRepository, ipService);
export const activateUserService = new Activate(userRepository);
export const forgotPasswordService = new ForgotPassword(userRepository, resetTokenService, emailService);
export const getActiveSessionsService = new GetActiveSessions(userRepository);
export const getUserByIdService = new GetUserById(userRepository);
export const getAllUsersService = new GetAllUsers(userRepository);
export const signInService = new SignIn(userRepository, passwordHashService, createSessionService, renewAccessService);
export const signUpService = new SignUp(userRepository, uuidService, passwordHashService);
export const updateOptionalData = new UpdateOptionalData(userRepository);
export const updatePasswordService = new UpdatePassword(userRepository, passwordHashService);
export const updateForgottenPasswordService = new UpdateForgottenPassword(resetTokenService, updatePasswordService);
