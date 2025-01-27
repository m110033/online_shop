import { Injectable } from '@nestjs/common';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';

@Injectable()
export class PaymentsService {
  confirmPayment(dto: ConfirmPaymentDto) {
    console.log(
      `Transaction ID: ${dto.transactionId}, Order ID: ${dto.orderId}`,
    );
  }

  cancelPayment(orderId: string) {
    console.log(`Order ID: ${orderId}`);
  }
}
