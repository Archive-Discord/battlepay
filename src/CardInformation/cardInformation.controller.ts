import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { RequestWithUser } from '@types';
import { Response } from 'express';
import { cardInformationService } from './cardInformation.service';
import { addCardDto } from './dto/cardAdd.Dto';

@Controller()
export class cardInformationController {
  constructor(private readonly cardInformationService: cardInformationService) {}

  @Get('/auth')
  async auth(@Req() req: RequestWithUser, @Res() res: Response): Promise<void> {
    return await this.cardInformationService.auth(req, res);
  }

  @Get('/cardlist')
  async getCardList(@Req() req: RequestWithUser, @Res() res: Response): Promise<void> {
    return await this.cardInformationService.getCardList(req, res);
  }
}
