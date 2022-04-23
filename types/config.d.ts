export interface IConfig {
    PORT: number;
    TOSS_SECRET_KEY: string;
    BASE_API_URL: string;
    WEBHOOK_URL: string;
    JWT_SECRET_KEY: string;
    DATABASE: {
        MONGODB_URI: string;
        MONGODB_USER?: string;
        MONGODB_PASSWORD?: string;
        MONGODB_AUTH_SOURCE?: string;
    }
}