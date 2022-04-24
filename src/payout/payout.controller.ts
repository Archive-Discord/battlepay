import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { RequestWithUser } from '@types';
import { Response } from 'express';
import { PayoutService } from './payout.service';
import { AccountAddDto } from './dto/AccountAdd.dto';

@Controller('/payout')
export class PayoutServiceController {
  constructor(private readonly PayoutService: PayoutService) {}

  
  @Get('/@me')
  async payoutMy(@Req() req: RequestWithUser, @Res() res: Response): Promise<void> {
    return await this.PayoutService.GetPayoutMe(req, res);
  }

  @Get('/:id/setting')
  async payoutSettingGet(@Req() req: RequestWithUser, @Res() res: Response): Promise<void> {
    return await this.PayoutService.getPayoutSetting(req, res);
  }

  @Post('/:id/setting')
  async payoutSetting(@Req() req: RequestWithUser, @Res() res: Response, @Body() accout: AccountAddDto): Promise<void> {
    return await this.PayoutService.SettingPayout(req, res, accout);
  }
}
