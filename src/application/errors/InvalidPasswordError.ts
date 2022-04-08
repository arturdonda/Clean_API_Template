export class InvalidPasswordError extends Error {
	public readonly userError: boolean;

	constructor() {
		super('Senha inválida.');
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;
		this.userError = true;

		Error.captureStackTrace(this);
	}
}
