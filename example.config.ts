import { IConfig } from "types/config";

export const config: IConfig = {
    PORT: 8080,
    TOSS_SECRET_KEY: "TOSS_SECRET_KEY",
    BASE_API_URL: "https://battlebot.kr/api",
    WEBHOOK_URL: "https://discordapp.com/api/webhooks/...",
    JWT_SECRET_KEY: "secret",
    DATABASE: {
        MONGODB_URI: "mongodb://localhost:27017/battlebot",
        MONGODB_USER: "",
        MONGODB_PASSWORD: "",
        MONGODB_AUTH_SOURCE: "admin"
    }
}