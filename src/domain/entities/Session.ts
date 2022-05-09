import { Geolocation } from '@domain/entities';
import { InvalidParamError } from '@domain/errors';

export class Session {
	private _token: string;
	private _expiredAt: Date;
	private _createdAt: Date;
	private _revokedAt: Date | null;
	private _createdBy: Geolocation;
	private _revokedBy: Geolocation | null;

	constructor({ token, expiredAt, createdBy, createdAt }: { token: string; expiredAt: Date; createdBy: Geolocation; createdAt?: Date }) {
		this._token = Session.validateToken(token);
		this._expiredAt = expiredAt;
		this._createdAt = createdAt ? Session.validateCreatedAt(createdAt) : new Date();
		this._revokedAt = null;
		this._createdBy = createdBy;
		this._revokedBy = null;
	}

	//#region Getters

	get token() {
		return this._token;
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

	revoke(revokedBy: Geolocation, revokedAt?: Date) {
		this._revokedAt = revokedAt ?? new Date();
		this._revokedBy = revokedBy;
	}

	//#endregion Methods

	//#region Static Validations

	static validateCreatedAt(createdAt: Date) {
		if (createdAt > new Date()) throw new InvalidParamError('Data de criação', 'não pode ser no futuro.');

		return createdAt;
	}

	static validateToken(token: string) {
		if (token.trim().length === 0) throw new InvalidParamError('Session Token', 'não pode ser vazio.');

		return token;
	}

	//#endregion Static Validations
}
