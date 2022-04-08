export class DatabaseError extends Error {
	public readonly userError: boolean;

	constructor(error: Error) {
		super(`Database error: ${error.message}`);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;
		this.userError = false;

		Error.captureStackTrace(this);
	}
}
