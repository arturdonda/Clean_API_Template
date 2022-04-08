export class MissingParamError extends Error {
	constructor(paramName: string) {
		super(`O parâmetro '${paramName}' é obrigatório.`);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;

		Error.captureStackTrace(this);
	}
}
