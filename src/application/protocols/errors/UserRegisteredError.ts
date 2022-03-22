export class UserRegisteredError extends Error {
	constructor() {
		super('Usuário já cadastrado.');

		this.name = 'UserRegisteredError';
		Object.setPrototypeOf(this, UserRegisteredError.prototype);
	}
}
