import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { QRCodeService } from './qrcode.service';

@Controller('qrcode')
export class QRCodeController {
  constructor(private readonly qrCodeService: QRCodeService) {}

  // @Get('list')
  // async getQRCodeList(@Query('redeemed') redeemed?: boolean) {
  //   const qrCodes = await this.qrCodeService.getQRCodeList(redeemed);
  //   return { qrCodes };
  // }

  @Get('list')
  getQRCodeList() {
    return { qrCodes: [] };
  }

  @Post('generate')
  async generateQRCode(@Body('length') length: number) {
    const success = await this.qrCodeService.generateQRcodes(length);
    return { success };
  }

  @Get('check')
  async checkQRCode(@Query('code') code: string) {
    const status = await this.qrCodeService.checkQRCode(code);
    return { status };
  }

  @Post('redeem')
  async redeemQRCode(@Body('code') code: string) {
    const success = await this.qrCodeService.redeemQRCode(code);
    return { status: success ? 'success' : 'failed' };
  }
}
