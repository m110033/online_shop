import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LineBotService } from './line-bot.service';
import { LineBotController } from './line-bot.controller';
import { ConfigModule } from '@nestjs/config';
import { LineBotMiddleware } from './line-bot.middleware';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [LineBotController],
  providers: [LineBotMiddleware, LineBotService],
})
export class LineBotModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LineBotMiddleware).forRoutes('webhook');
  }
}
