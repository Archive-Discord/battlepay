import { Request } from "express";

export interface RequestWithUser extends Request {
    user: User;
}

export interface User {
    _id: string
    id: string
    email: string
    accessToken: string
    refreshToken: string
    kakao_accessToken?: string
    kakao_refreshToken?: string
    kakao_email?: string
    kakao_name?: string
    google_accessToken?: string
    google_refreshToken?: string
    token: string
    tokenExp: number
    expires_in: number
    published_date: Date
}