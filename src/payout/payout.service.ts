import { Injectable, HttpException, ConsoleLogger } from '@nestjs/common';
import { RequestWithUser, submall } from '@types';
import { Response } from 'express';
import ResponseWrapper from 'src/utils/ResponseWrapper';
import axios, { AxiosResponse, AxiosError } from "axios";
import RequestToss from 'src/utils/TossClient';
import { InjectModel } from '@nestjs/mongoose';
import { userData } from 'src/common/schemas/user.schema';
import { userPayData } from 'src/common/schemas/payments.schema';
import { Model } from "mongoose";
import { guildMemberShipSubmit } from 'src/common/schemas/serverSubmit.schema';
import { AccountAddDto } from './dto/AccountAdd.dto';
import { config } from 'config';
import DiscordWebhook from 'src/utils/WebhookSender';
import { guildMemberShip } from 'src/common/schemas/membershipServer.schema';
@Injectable()
export class PayoutService {
  constructor(
    @InjectModel(guildMemberShip.name) private readonly guildMemberShip: Model<guildMemberShip>
) {}

  async GetPayoutMe(req: RequestWithUser, res: Response): Promise<void> {
    const membershipGuilds = await this.guildMemberShip.find({owner_id: req.user.id})
    return ResponseWrapper(res, membershipGuilds);
  }

  async getPayoutSetting(req: RequestWithUser, res: Response): Promise<void> {
    const membershipGuild = await this.guildMemberShip.findOne({guild_id: req.params.id})
    if(!membershipGuild) throw new HttpException('찾을 수 없는 서버입니다', 404);
    if(membershipGuild.owner_id !== req.user.id) throw new HttpException("해당 서버를 관리할 권한이 없습니다", 401);
    try {
      const tossRequest: AxiosResponse = await RequestToss('/payouts/sub-malls', null, 'GET') as AxiosResponse
      const subMalls: submall[] = tossRequest.data
      const payoutAccount = subMalls.find((subMalls) => subMalls.subMallId === req.params.id);
      const payoutObject = {
        server: membershipGuild,
        payoutAccount: payoutAccount || null
      }
      return ResponseWrapper(res, payoutObject);
    } catch(e) {
      console.log(e)
      if(e.response.data) {
        throw new HttpException(e.response.data.message, e.response.status);
      } else {
        throw new HttpException(e.message, 400);
      }
    }
  }

  async SettingPayout(req: RequestWithUser, res: Response, accout: AccountAddDto): Promise<void> {
    const membershipGuild = await this.guildMemberShip.findOne({guild_id: req.params.id})
    if(!membershipGuild) throw new HttpException('찾을 수 없는 서버입니다', 404);
    if(membershipGuild.owner_id !== req.user.id) throw new HttpException("해당 서버를 관리할 권한이 없습니다", 401);
    try {
      const tossRequest: AxiosResponse = await RequestToss('/payouts/sub-malls', null, 'GET') as AxiosResponse
      const subMalls: submall[] = tossRequest.data
      const payoutAccount = subMalls.find((subMalls) => subMalls.subMallId === req.params.id);
      if(payoutAccount) throw new HttpException('이미 정산 계좌가 등록되어 있습니다.', 400);
      await RequestToss('/payouts/sub-malls', {
        subMallId: req.params.id,
        type: "INDIVIDUAL",
        account: {
          bank: accout.bank,
          accountNumber: accout.accountNumber,
          holderName: accout.holderName
        }
      }, 'POST') as AxiosResponse
      return ResponseWrapper(res, null, 200, '설정이 저장되었습니다.');
    } catch(e) {
      console.log(e.response.data)
      if(e.response.data) {
        throw new HttpException(e.response.data.message, e.response.status);
      } else {
        throw new HttpException(e.message, 400);
      }
    }
  }
}
