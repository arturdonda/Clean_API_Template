export class UserNotFoundError extends Error {
	constructor() {
		super(`Usuário não cadastrado.`);

		this.name = 'UserNotFoundError';
		Object.setPrototypeOf(this, UserNotFoundError.prototype);
	}
}
