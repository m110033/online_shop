import { Controller, Get, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';

@Controller('payment')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('confirm')
  confirmPayment(@Query() dto: ConfirmPaymentDto) {
    return this.paymentsService.confirmPayment(dto);
  }

  @Get('cancel')
  cancelPayment(@Query('orderId') orderId: string) {
    return this.paymentsService.cancelPayment(orderId);
  }
}
