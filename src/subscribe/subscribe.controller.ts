import { Body, Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { RequestWithUser } from '@types';
import { Response } from 'express';
import { SubscribeService } from './subscribe.service';
import { ServerAddDto } from './dto/ServerAdd.dto';

@Controller('/server')
export class SubscribeServiceController {
  constructor(private readonly SubscribeService: SubscribeService) {}


  @Get('/:id')
  async getCardList(@Req() req: RequestWithUser, @Res() res: Response, @Param('id') server: string): Promise<void> {
    return await this.SubscribeService.GetServer(req, res, server);
  }
}
