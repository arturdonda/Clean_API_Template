export class MissingParamError extends Error {
	public readonly userError: boolean;

	constructor(paramName: string) {
		super(`O parâmetro '${paramName}' é obrigatório.`);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;
		this.userError = true;

		Error.captureStackTrace(this);
	}
}
