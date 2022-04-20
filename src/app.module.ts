import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'config';
import { cardInformationModule } from './CardInformation/cardInformation.module';

@Module({
  imports: [config.DATABASE.MONGODB_USER ? MongooseModule.forRootAsync({
    useFactory: async() => ({
      uri: config.DATABASE.MONGODB_URI,
      auth: {
        username: config.DATABASE.MONGODB_USER,
        password: config.DATABASE.MONGODB_PASSWORD,
      },
      authSource: config.DATABASE.MONGODB_AUTH_SOURCE
    })
  }) : MongooseModule.forRoot(config.DATABASE.MONGODB_URI),
  cardInformationModule],
})
export class AppModule {}
