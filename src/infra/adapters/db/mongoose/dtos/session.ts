import { Session } from '@/domain/entities';
import { ISession } from '@/infra/adapters/db/mongoose/interfaces';
import { makeGeolocation } from '.';

export const makeSession = (dbSession: ISession): Session => {
	const session = new Session({
		token: dbSession.token,
		expiredAt: dbSession.expiredAt,
		createdAt: dbSession.createdAt,
		createdBy: makeGeolocation(dbSession.createdBy),
	});
	if (dbSession.revokedAt && dbSession.revokedBy) {
		session.revoke(makeGeolocation(dbSession.revokedBy), dbSession.revokedAt);
	}

	return session;
};

export const makeSessions = (dbSessions: ISession[]): Session[] => {
	return dbSessions.map(dbSession => makeSession(dbSession));
};
