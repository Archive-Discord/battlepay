import { Controller, Get, Req, Res } from '@nestjs/common';
import { RequestWithUser } from '@types';
import { Response } from 'express';
import { cardInformationService } from './cardInformation.service';

@Controller()
export class cardInformationController {
  constructor(private readonly cardInformationService: cardInformationService) {}

  @Get('/cardlist')
  async getCardList(@Req() req: RequestWithUser, @Res() res: Response): Promise<void> {
    return await this.cardInformationService.getCardList(req, res);
  }
}
