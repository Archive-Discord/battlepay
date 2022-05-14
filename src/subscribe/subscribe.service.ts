import { Injectable, HttpException, ConsoleLogger } from '@nestjs/common';
import { RequestWithUser } from '@types';
import { Response } from 'express';
import ResponseWrapper from 'src/utils/ResponseWrapper';
import axios, { AxiosResponse, AxiosError } from "axios";
import RequestToss from 'src/utils/TossClient';
import { InjectModel } from '@nestjs/mongoose';
import { userData } from 'src/common/schemas/user.schema';
import { userPayData } from 'src/common/schemas/payments.schema';
import { Model } from "mongoose";
import { guildMemberShip } from 'src/common/schemas/membershipServer.schema';
import { ServerAddDto } from './dto/ServerAdd.dto';
import { config } from 'config';
import DiscordWebhook from 'src/utils/WebhookSender';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectModel(guildMemberShip.name) private readonly guildMemberShipModel: Model<guildMemberShip>
) {}
  async GetServer(req: RequestWithUser, res: Response, Server: string): Promise<void> {
    const server = await this.guildMemberShipModel.findOne({guild_id: Server})
    if(!server) throw new HttpException('찾을 수 없는 서버입니다', 404);
    return ResponseWrapper(res, server);
  }
}
