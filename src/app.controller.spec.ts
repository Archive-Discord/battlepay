import { Test, TestingModule } from '@nestjs/testing';
import { cardInformationController } from './CardInformation/cardInformation.controller';
import { cardInformationService } from './CardInformation/cardInformation.service';

describe('AppController', () => {
  let appController: cardInformationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [cardInformationController],
      providers: [cardInformationService],
    }).compile();

    appController = app.get<cardInformationController>(cardInformationController);
  });

  describe('root', () => {
  });
});
