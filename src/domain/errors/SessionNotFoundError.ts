export class SessionNotFoundError extends Error {
	public readonly userError: boolean;

	constructor() {
		super(`Sessão não encontrada`);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;
		this.userError = true;

		Error.captureStackTrace(this);
	}
}
