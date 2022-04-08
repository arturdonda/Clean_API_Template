export class InvalidParamError extends Error {
	constructor(param: string, message: string) {
		super(`Campo '${param}' inválido: ${message}`);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;

		Error.captureStackTrace(this);
	}
}
