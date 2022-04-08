export class InvalidPasswordError extends Error {
	constructor() {
		super('Senha inválida.');
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;

		Error.captureStackTrace(this);
	}
}
