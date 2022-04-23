
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';
import { SubmitServiceController } from './submit.controller';
import { SubmitService } from './submit.service';
import { UserSchema } from '../common/schemas/user.schema';
import { UserPaySchema } from 'src/common/schemas/payments.schema';
import { guildMemberShipSubmitSchema } from 'src/common/schemas/serverSubmit.schema';

@Module({
  controllers: [SubmitServiceController],
  providers: [SubmitService],
  imports: [MongooseModule.forFeature([
    {name: "userData", schema: UserSchema, collection: "userData"},
    {name: "guildMemberShipSubmit", schema: guildMemberShipSubmitSchema, collection: "guildMemberShipSubmit"}
  ])],
})
export class SubmitModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .forRoutes('submit')
  }
}