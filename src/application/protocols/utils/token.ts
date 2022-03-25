export interface ITokenService {
	generate: (userId: string) => ITokenService.GenerateResult;
	validate: (token: string) => ITokenService.ValidateResult;
}

export namespace ITokenService {
	export type GenerateResult = { token: string } & DefaultTokenProperties;
	export type ValidateResult = DefaultTokenProperties;
}

type DefaultTokenProperties = {
	issuedAt: Date;
	expiredAt: Date;
	audience: string;
	issuer: string;
};
