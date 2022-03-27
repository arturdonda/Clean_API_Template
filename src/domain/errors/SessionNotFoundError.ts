export class SessionNotFoundError extends Error {
	constructor() {
		super(`Sessão não encontrada`);

		this.name = 'SessionNotFoundError';
		Object.setPrototypeOf(this, SessionNotFoundError.prototype);
	}
}
