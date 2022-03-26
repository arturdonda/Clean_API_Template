export class ExpiredTokenError extends Error {
	constructor() {
		super(`Token expirado.`);

		this.name = 'ExpiredTokenError';
		Object.setPrototypeOf(this, ExpiredTokenError.prototype);
	}
}
