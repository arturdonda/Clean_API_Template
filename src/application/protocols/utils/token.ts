export interface ITokenService {
	generate: (userId: string) => { token: string } & DefaultTokenProperties;
	validate: (token: string) => DefaultTokenProperties;
}

type DefaultTokenProperties = {
	issuedAt: number;
	expiredAt: number;
	audience: string;
	issuer: string;
};
