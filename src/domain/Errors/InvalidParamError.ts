export class InvalidParamError extends Error {
	constructor(param: string, message: string) {
		super(`Campo '${param}' inválido: ${message}`);

		Object.setPrototypeOf(this, InvalidParamError.prototype);
	}
}
