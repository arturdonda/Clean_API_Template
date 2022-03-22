export interface IHashService {
	hash: (password: string) => string;
	verify: (password: string, hash: string) => boolean;
}
