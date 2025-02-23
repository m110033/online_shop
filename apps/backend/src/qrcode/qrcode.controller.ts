import { Controller, Get, Query } from '@nestjs/common';
import { QRCodeService } from './qrcode.service';

@Controller('qrcode')
export class QRCodeController {
  constructor(private readonly qrCodeService: QRCodeService) {}

  @Get('generate')
  async generateQRCode() {
    const qrCodeDataUrl = await this.qrCodeService.generateQRCode();
    return { qrCodeDataUrl };
  }

  @Get('redeem')
  async redeemQRCode(@Query('code') code: string) {
    const success = await this.qrCodeService.redeemQRCode(code);
    return { success };
  }
}
