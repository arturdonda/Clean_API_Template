export class UserRegisteredError extends Error {
	constructor(field: string) {
		super(`${field} já cadastrado.`);

		this.name = 'UserRegisteredError';
		Object.setPrototypeOf(this, UserRegisteredError.prototype);
	}
}
