
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            DB_URL_LOCAL: string;
            NODE_ENV: string;
            TOKEN_SPOTIFY: string
        }
    }
}

export {}