import { Injectable } from '@nestjs/common';

@Injectable()
export class cardInformationService {
  getHello(): string {
    return 'Hello World!';
  }
}
