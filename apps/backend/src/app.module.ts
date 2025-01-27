import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LineBotModule } from './line-bot/line-bot.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { LinePayModule } from './line-pay/line-pay.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
      load: [configuration],
    }),
    LineBotModule,
    LinePayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
