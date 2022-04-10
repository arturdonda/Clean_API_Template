export class MissingSessionTokenError extends Error {
	public readonly userError: boolean;

	constructor() {
		super('Cookie de sessão não localizado.');
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;
		this.userError = true;

		Error.captureStackTrace(this);
	}
}
