import { Controller, Get } from '@nestjs/common';
import { cardInformationService } from './cardInformation.service';

@Controller()
export class cardInformationController {
  constructor(private readonly cardInformationService: cardInformationService) {}

  @Get('/cardlist')
  getHello(): string {
    return this.cardInformationService.getHello();
  }
}
