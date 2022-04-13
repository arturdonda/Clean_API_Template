export class RevokedTokenError extends Error {
	public readonly userError: boolean;

	constructor() {
		super(`Token revogado.`);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;
		this.userError = true;

		Error.captureStackTrace(this);
	}
}
