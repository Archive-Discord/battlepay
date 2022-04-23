import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { RequestWithUser } from '@types';
import { Response } from 'express';
import { SubmitService } from './submit.service';
import { ServerAddDto } from './dto/ServerAdd.dto';

@Controller('/submit')
export class SubmitServiceController {
  constructor(private readonly SubmitService: SubmitService) {}


  @Post('/guild')
  async getCardList(@Req() req: RequestWithUser, @Res() res: Response, @Body() ServerAdd: ServerAddDto): Promise<void> {
    return await this.SubmitService.SubmitServer(req, res, ServerAdd);
  }
}
