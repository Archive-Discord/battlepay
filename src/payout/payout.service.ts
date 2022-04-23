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
import { ServerAddDto } from './dto/ServerAdd.dto';
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
    try {
      const tossRequest: AxiosResponse = await RequestToss('/payouts/sub-malls', null, 'GET') as AxiosResponse
      const subMalls: submall[] = tossRequest.data
      const payoutAccount = subMalls.find((subMalls) => subMalls.subMallId === req.params.id);
      console.log(payoutAccount)
      return ResponseWrapper(res, payoutAccount);
    } catch(e) {
      console.log(e)
      throw new HttpException(e.response.data.message, e.response.status);
    }
  }

  async SettingPayout(req: RequestWithUser, res: Response): Promise<void> {
    const guildSubmitData = await this.guildMemberShip.findOne({guild_id: req.params.id})
  }
}
