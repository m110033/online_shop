import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LinePayService } from './line-pay.service';
import { LinePayController } from './line-pay.controller';
import { HttpModule } from '@nestjs/axios';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, PaymentsModule],
  controllers: [LinePayController],
  providers: [LinePayService],
})
export class LinePayModule {}
