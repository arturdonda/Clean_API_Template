export class InvalidTokenError extends Error {
	public readonly userError: boolean;

	constructor(reason: string) {
		super(`Invalid Token: ${reason}`);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;
		this.userError = true;

		Error.captureStackTrace(this);
	}
}
