export class InvalidPasswordError extends Error {
	constructor() {
		super('Senha inválida.');

		this.name = 'InvalidPasswordError';
		Object.setPrototypeOf(this, InvalidPasswordError.prototype);
	}
}
