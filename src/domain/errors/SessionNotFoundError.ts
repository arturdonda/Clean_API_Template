export class SessionNotFoundError extends Error {
	constructor() {
		super(`Sessão não encontrada`);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;

		Error.captureStackTrace(this);
	}
}
