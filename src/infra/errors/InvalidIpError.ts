export class InvalidIpError extends Error {
	public readonly userError: boolean;

	constructor(ipAddress: string) {
		super(`Invalid IP Address: ${ipAddress}`);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;
		this.userError = false;

		Error.captureStackTrace(this);
	}
}
