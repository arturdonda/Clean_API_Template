export class ExpiredTokenError extends Error {
	constructor() {
		super(`Token expirado.`);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;

		Error.captureStackTrace(this);
	}
}
