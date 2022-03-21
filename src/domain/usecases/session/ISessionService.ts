import { Session } from '@/domain/entities/classes';

export interface ISessionService {
	createSession: ({ userId, ipAddress }: { userId: string; ipAddress: string }) => Promise<Session>;
	renewSession: ({ sessionToken }: { sessionToken: string }) => Promise<{ accessToken: string }>;
	revokeSession: ({ userId, refreshToken, ipAddress }: { userId: string; refreshToken: string; ipAddress: string }) => Promise<void>;
}
