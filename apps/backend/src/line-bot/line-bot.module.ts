import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LineBotService } from './line-bot.service';
import { LineBotController } from './line-bot.controller';
import { LineBotMiddleware } from './line-bot.middleware';

@Module({
  imports: [],
  controllers: [LineBotController],
  providers: [LineBotMiddleware, LineBotService],
})
export class LineBotModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LineBotMiddleware).forRoutes('webhook');
  }
}
