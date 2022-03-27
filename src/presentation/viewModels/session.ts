import { Session } from '@domain/entities';
import { GeolocationViewModel } from '.';

export class SessionViewModel {
	constructor({
		token,
		expiredAt,
		createdAt,
		revokedAt,
		createdBy,
		revokedBy,
	}: {
		token: string;
		expiredAt: string;
		createdAt: string;
		revokedAt: string | null;
		createdBy: GeolocationViewModel;
		revokedBy: GeolocationViewModel | null;
	}) {}

	static map(entity: Session): SessionViewModel {
		return new SessionViewModel({
			token: entity.token,
			expiredAt: entity.expiredAt.toISOString(),
			createdAt: entity.createdAt.toISOString(),
			revokedAt: entity.revokedAt ? entity.revokedAt.toISOString() : null,
			createdBy: GeolocationViewModel.map(entity.createdBy),
			revokedBy: entity.revokedBy ? GeolocationViewModel.map(entity.revokedBy) : null,
		});
	}

	static mapCollection(entities: Session[]): SessionViewModel[] {
		return entities.map(entity => SessionViewModel.map(entity));
	}
}
