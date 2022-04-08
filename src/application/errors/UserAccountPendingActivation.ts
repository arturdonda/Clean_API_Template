export class UserAccountPendingActivation extends Error {
	constructor() {
		super('Conta pendente de ativação.');
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;

		Error.captureStackTrace(this);
	}
}
