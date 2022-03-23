import { ISignIn } from '@/domain/usecases/user';
import { ICreateSession, IRenewAccess } from '@/domain/usecases/session';
import { IUserRepository } from '@/application/protocols/repositories';
import { IHashService } from '@/application/protocols/utils';
import { InvalidPasswordError, UserAccountPendingActivation, UserNotFoundError } from '@/application/protocols/errors';

export class SignIn implements ISignIn {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly passwordHashService: IHashService,
		private readonly createSessionService: ICreateSession,
		private readonly renewAccessService: IRenewAccess
	) {}

	exec = async ({ email, password, ipAddress }: ISignIn.Params): Promise<ISignIn.Result> => {
		const user = await this.userRepository.getByEmail(email);

		if (!user) throw new UserNotFoundError();

		if (user.status === 'Pending') throw new UserAccountPendingActivation();

		if (!this.passwordHashService.verify(password, user.password)) throw new InvalidPasswordError();

		const session = await this.createSessionService.exec({
			userId: user.id,
			ipAddress: ipAddress,
		});

		user.addSession(session);

		await this.userRepository.update(user);

		return {
			user: user,
			refreshToken: session.token,
			accessToken: await this.renewAccessService.exec(session.token),
		};
	};
}
