import { Injectable, HttpException } from '@nestjs/common';
import { RequestWithUser } from '@types';
import { Response } from 'express';
import ResponseWrapper from 'src/utils/ResponseWrapper';
import axios, { AxiosResponse, AxiosError } from "axios";
import RequestToss from 'src/utils/TossClient';
import { InjectModel } from '@nestjs/mongoose';
import { userData } from 'src/common/schemas/user.schema';
import { userPayData } from 'src/common/schemas/payments.schema';
import { Model } from "mongoose";
@Injectable()
export class cardInformationService {
  constructor(
    @InjectModel(userData.name) private readonly UserModel: Model<userData>,
    @InjectModel(userPayData.name) private readonly UserPayModel: Model<userPayData>
) {}
  async auth(req: RequestWithUser, res: Response): Promise<void> {
    await RequestToss('/brandpay/authorizations/access-token', {
      "grantType": "AuthorizationCode",
      "code": req.query.code,
      "customerKey": req.user.id
    }, 'POST')
    .then(async(data: AxiosResponse) => {
      await this.UserPayModel.updateOne({user_id: req.user.id}, {$set: {access_token: data.data.accessToken, refresh_token: data.data.refreshToken}}, {upsert: true})
        .catch(err => {
          throw new HttpException('카드 정보를 저장하는데 실패했습니다.', 500);
        })
    }).catch((err: AxiosError) => {
      if(err.response) {
        throw new HttpException(err.response.data.message, err.response.status);
      } else {
        throw new HttpException(err.message, 500);
      }
    })
    return ResponseWrapper(res);
  }

  async getCardList(req: RequestWithUser, res: Response): Promise<void> {
    const userPayData = await this.UserPayModel.findOne({user_id: req.user.id})
    await RequestToss(`/connectpay/payments/methods/${req.user.id}`, null, 'GET')
      .then((data: AxiosResponse) => {
        return ResponseWrapper(res, data.data)
      })
      .catch((e: AxiosError) => {
        console.log(e)
        throw new HttpException(e.response.data.message, e.response.status);
      })
  }
}
