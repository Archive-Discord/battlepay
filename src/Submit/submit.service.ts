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
import { guildMemberShipSubmit } from 'src/common/schemas/serverSubmit.schema';
import { ServerAddDto } from './dto/ServerAdd.dto';
import { config } from 'config';
import DiscordWebhook from 'src/utils/WebhookSender';
@Injectable()
export class SubmitService {
  constructor(
    @InjectModel(guildMemberShipSubmit.name) private readonly guildSubmitModel: Model<guildMemberShipSubmit>
) {}
  async SubmitServer(req: RequestWithUser, res: Response, Server: ServerAddDto): Promise<void> {
    const guildSubmitData = await this.guildSubmitModel.findOne({guild_id: Server.guild_id})
    if(guildSubmitData) throw new HttpException('이미 승인되었거나 신청이 접수된 서버입니다.', 400);
    try {
      await axios.get(`${config.BASE_API_URL}/guild/${Server.guild_id}`, {
        headers: {
          Cookie: `auth=${req.cookies.auth}`
        }
      })
    } catch(e) {
      console.log(e)
      throw new HttpException('해당 서버를 관리할 권한이 없습니다', 401);
    }
    try {
      await this.guildSubmitModel.updateOne({guild_id: Server.guild_id}, {$set: {name: Server.membershipName, useage: Server.membershipUseage, benefit: Server.membershipBenefit, owner_id: req.user.id}}, {upsert: true})
    } catch(e) {
      console.log(e)
      throw new HttpException('서버 정보를 저장하는데 실패했습니다.', 500);
    }
    DiscordWebhook('서버 멤버쉽 신청', 
    `\`\`\`diff
+ 서버 아이디: ${Server.guild_id}
+ 멤버쉽 이름: ${Server.membershipName}
+ 사용목적: ${Server.membershipUseage}
+ 혜택: ${Server.membershipBenefit}
+ 신청자: ${req.user.id}
\`\`\``)
    return ResponseWrapper(res, null, 200, '성공적으로 신청이 접수되었습니다. 검토까지 최대 3일이 소요될 수 있습니다.');
  }
}
