export class DatabaseError extends Error {
	constructor(error: Error) {
		super(`Database error: ${error.message}`);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;

		Error.captureStackTrace(this);
	}
}
