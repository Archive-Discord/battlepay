import { HttpException, Injectable, NestMiddleware } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RequestWithUser, User as UserTypes } from "@types";
import { config } from "config";
import { NextFunction, Response } from "express";
import { JsonWebTokenError, verify } from "jsonwebtoken"
import { userData } from "../schemas/user.schema";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        @InjectModel(userData.name) private readonly UserModel: Model<userData>
    ) {}
    async use(req: RequestWithUser, res: Response, next: NextFunction) {
        const token = req.cookies['auth'] || (req.header('authorization') ? req.header('authorization').split('Bearer ')[1] : null);
        if(!token) {
            throw new HttpException('로그인 후 이용해주세요', 401);
        } else {
            try {
                const payload: UserTypes = verify(token, config.JWT_SECRET_KEY) as UserTypes;

                const User: UserTypes = await this.UserModel.findOne({ id: payload.id }) as unknown as UserTypes;
                if(!User) throw new HttpException('회원가입 후 이용해주세요', 401)
                req.user = User;
                next();
            } catch(e) {
                if(e.message === "invalid signature") {
                    throw new HttpException('유효하지 않은 토큰입니다', 401);
                } else {
                    throw new HttpException(e.message, 401)
                }
            }
        }
    }
}