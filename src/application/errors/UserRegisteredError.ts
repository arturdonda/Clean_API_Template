export class UserRegisteredError extends Error {
	constructor(field: string) {
		super(`${field} já cadastrado.`);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;

		Error.captureStackTrace(this);
	}
}
