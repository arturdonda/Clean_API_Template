export class TokenExpiredError extends Error {
	public readonly userError: boolean;

	constructor(expiredAt: string) {
		super(`Token expired at ${expiredAt}`);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;
		this.userError = true;

		Error.captureStackTrace(this);
	}
}
