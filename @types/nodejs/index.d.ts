declare namespace NodeJS {
	export interface ProcessEnv {
		NODE_ENV: 'dev' | 'prod' | 'test';
		PORT: string;
		ISSUER: string;
		LOCAL_IP: string;

		MONGODB_CONNECTION_STRING: string;

		SESSION_TOKEN_SECRET: string;
		ACCESS_TOKEN_SECRET: string;
		CONFIRMATION_TOKEN_SECRET: string;
		RESET_PASSWORD_TOKEN_SECRET: string;

		SESSION_TOKEN_EXPIRATION_IN_DAYS: string;
		ACCESS_TOKEN_EXPIRATION_IN_MINUTES: string;
		RESET_PASSWORD_TOKEN_EXPIRATION_IN_MINUTES: string;

		IPDATA_KEY: string;

		EMAIL_SERVICE_USERNAME: string;
		EMAIL_SERVICE_PASSWORD: string;

		API_BASE_URL: string;
	}
}
