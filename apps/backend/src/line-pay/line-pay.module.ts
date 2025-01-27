import { Module } from '@nestjs/common';
import { LinePayService } from './line-pay.service';
import { LinePayController } from './line-pay.controller';
import { HttpModule } from '@nestjs/axios';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [HttpModule, PaymentsModule],
  controllers: [LinePayController],
  providers: [LinePayService],
})
export class LinePayModule {}
