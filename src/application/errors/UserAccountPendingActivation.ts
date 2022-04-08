export class UserAccountPendingActivation extends Error {
	public readonly userError: boolean;

	constructor() {
		super('Conta pendente de ativação.');
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;
		this.userError = true;

		Error.captureStackTrace(this);
	}
}
