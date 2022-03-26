export class DatabaseError extends Error {
	constructor(error: Error) {
		super(`Database error: ${error.message}`);

		this.name = 'DatabaseError';
		this.stack = error.stack;

		Object.setPrototypeOf(this, DatabaseError.prototype);
	}
}
