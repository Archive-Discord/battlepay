
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';
import { cardInformationController } from './cardInformation.controller';
import { cardInformationService } from './cardInformation.service';
import { UserSchema } from '../common/schemas/user.schema';

@Module({
  controllers: [cardInformationController],
  providers: [cardInformationService],
  imports: [MongooseModule.forFeature([{name: "userData", schema: UserSchema, collection: "userData"}])],
})
export class cardInformationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .forRoutes('cardlist');
  }
}