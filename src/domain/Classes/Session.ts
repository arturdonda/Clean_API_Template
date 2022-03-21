import { Geolocation } from '@/domain/Classes';
import { InvalidParamError } from '../Errors';

export class Session {
	private _refreshToken: string;
	private _expiredAt: Date;
	private _createdAt: Date;
	private _revokedAt: Date | null;
	private _createdBy: Geolocation;
	private _revokedBy: Geolocation | null;

	constructor({ refreshToken, expiredAt, createdBy }: { refreshToken: string; expiredAt: Date; createdBy: Geolocation }) {
		this._refreshToken = Session.validateRefreshToken(refreshToken);
		this._expiredAt = Session.validateExpiredAt(expiredAt);
		this._createdAt = new Date();
		this._revokedAt = null;
		this._createdBy = createdBy;
		this._revokedBy = null;
	}

	//#region Getters

	get refreshToken() {
		return this._refreshToken;
	}

	get expiredAt() {
		return this._expiredAt;
	}

	get createdAt() {
		return this._createdAt;
	}

	get revokedAt() {
		return this._revokedAt;
	}

	get createdBy() {
		return this._createdBy;
	}

	get revokedBy() {
		return this._revokedBy;
	}

	get isExpired() {
		return new Date() >= this._expiredAt;
	}

	get isActive() {
		return !this._revokedAt && !this.isExpired;
	}

	//#endregion Getters

	//#region Methods

	revoke(revokedBy: Geolocation) {
		this._revokedAt = new Date();
		this._revokedBy = revokedBy;
	}

	//#endregion Methods

	//#region Static Validations

	static validateRefreshToken(refreshToken: string) {
		if (refreshToken.trim().length === 0) throw new InvalidParamError('Refresh Token', 'não pode ser vazio.');

		return refreshToken;
	}

	static validateExpiredAt(expiredAt: Date) {
		if (expiredAt <= new Date()) throw new InvalidParamError('Data de expiração', 'não pode ser no passado.');

		return expiredAt;
	}
	//#endregion Static Validations
}
