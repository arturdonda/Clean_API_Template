export class UserRegisteredError extends Error {
	public readonly userError: boolean;

	constructor(field: string) {
		super(`${field} já cadastrado.`);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;
		this.userError = true;

		Error.captureStackTrace(this);
	}
}
