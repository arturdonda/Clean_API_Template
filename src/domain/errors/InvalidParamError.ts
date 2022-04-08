export class InvalidParamError extends Error {
	public readonly userError: boolean;

	constructor(param: string, message: string) {
		super(`Campo '${param}' inválido: ${message}`);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;
		this.userError = true;

		Error.captureStackTrace(this);
	}
}
