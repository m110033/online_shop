import { Controller, Post, Body } from '@nestjs/common';
import { LinePayService } from './line-pay.service';
import { RequestPaymentDto } from './dto/request-payment.dto';

@Controller('line-pay')
export class LinePayController {
  constructor(private readonly linePayService: LinePayService) {}

  @Post('request')
  requestPayment(@Body() requestPaymentDto: RequestPaymentDto) {
    return this.linePayService.requestPayment(requestPaymentDto);
  }
}
