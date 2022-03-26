export class UserAccountPendingActivation extends Error {
	constructor() {
		super('Conta pendente de ativação.');

		this.name = 'UserAccountPendingActivation';
		Object.setPrototypeOf(this, UserAccountPendingActivation.prototype);
	}
}
