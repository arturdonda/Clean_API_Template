import { Session } from '@domain/entities';
import { GeolocationViewModel } from '.';

export class SessionViewModel {
	private readonly token;
	private readonly expiredAt;
	private readonly createdAt;
	private readonly revokedAt;
	private readonly createdBy;
	private readonly revokedBy;

	constructor(properties: DtoProperties) {
		this.token = properties.token;
		this.expiredAt = properties.expiredAt;
		this.createdAt = properties.createdAt;
		this.revokedAt = properties.revokedAt;
		this.createdBy = properties.createdBy;
		this.revokedBy = properties.revokedBy;
	}

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

type DtoProperties = {
	token: string;
	expiredAt: string;
	createdAt: string;
	revokedAt: string | null;
	createdBy: GeolocationViewModel;
	revokedBy: GeolocationViewModel | null;
};
