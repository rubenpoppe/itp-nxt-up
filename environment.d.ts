declare global {
	namespace NodeJS {
		interface ProcessEnv {
			CMS_URL: string;
			CMS_API_KEY: string;
		}
	}
}

export {};
