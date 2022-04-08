export class UserNotFoundError extends Error {
	constructor() {
		super(`Usuário não cadastrado.`);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;

		Error.captureStackTrace(this);
	}
}
