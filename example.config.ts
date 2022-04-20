import { IConfig } from "types/config";

export const config: IConfig = {
    PORT: 8080,
    TOSS_SECRET_KEY: "TOSS_SECRET_KEY",
    JWT_SECRET_KEY: "secret",
    DATABASE: {
        MONGODB_URI: "mongodb://localhost:27017/battlebot",
        MONGODB_USER: "",
        MONGODB_PASSWORD: "",
        MONGODB_AUTH_SOURCE: "admin"
    }
}