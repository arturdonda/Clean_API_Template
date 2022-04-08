export class UserNotFoundError extends Error {
	public readonly userError: boolean;

	constructor() {
		super(`Usuário não cadastrado.`);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;
		this.userError = true;

		Error.captureStackTrace(this);
	}
}
