
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';
import { SubscribeServiceController } from './subscribe.controller';
import { SubscribeService } from './subscribe.service';
import { UserSchema } from '../common/schemas/user.schema';
import { UserPaySchema } from 'src/common/schemas/payments.schema';
import { guildMemberShipSchema } from 'src/common/schemas/membershipServer.schema';

@Module({
  controllers: [SubscribeServiceController],
  providers: [SubscribeService],
  imports: [MongooseModule.forFeature([
    {name: "userData", schema: UserSchema, collection: "userData"},
    {name: "guildMemberShip", schema: guildMemberShipSchema, collection: "guildMemberShip"}
  ])],
})
export class SubscribeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .forRoutes('server')
  }
}