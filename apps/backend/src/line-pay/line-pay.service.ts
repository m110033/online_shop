import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RequestPaymentDto } from './dto/request-payment.dto';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { LinePayResponse } from './types/line-pay-response.type';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import { PackageDto } from './modules/packages/dto/package.dto';

@Injectable()
export class LinePayService {
  private linePayUrl: string;
  private channelId: string;
  private channelSecret: string;
  private hostUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.channelId = this.configService.get<string>('linePay.channelId') || '';
    this.channelSecret =
      this.configService.get<string>('linePay.channelSecret') || '';
    this.linePayUrl = this.configService.get<string>('linePay.url') || '';
    this.hostUrl = this.configService.get<string>('hostUrl') || '';
  }

  /**
   * 使用 HMAC-SHA256 算法生成簽名
   * @param keys - 密鑰（channelSecret）
   * @param data - 要簽名的資料
   * @returns Base64 編碼的簽名
   */
  private encrypt(keys: string, data: string): string {
    const hmac = crypto.createHmac('sha256', keys); // 創建 HMAC-SHA256 實例
    hmac.update(data); // 更新要簽名的資料
    const signature = hmac.digest(); // 生成簽名
    return this.toBase64String(signature); // 將簽名轉換為 Base64 字串
  }

  /**
   * 將 byte 陣列轉換為 Base64 字串
   * @param bytes - 要轉換的 byte 陣列
   * @returns Base64 字串
   */
  private toBase64String(bytes: Buffer): string {
    return bytes.toString('base64'); // 將 byte 陣列轉換為 Base64 字串
  }

  private generateNonce(): string {
    return uuidv4();
  }

  private generateSignature(uri: string, body: any, nonce: string): string {
    const payload = this.channelSecret + uri + JSON.stringify(body) + nonce;
    return this.encrypt(this.channelSecret, payload); // 使用 encrypt 方法生成簽名
  }

  calculateTotalAmount(packages: PackageDto[], shippingFee: number): number {
    return (
      packages.reduce(
        (total, pkg) => total + pkg.amount + (pkg.userFee || 0),
        0,
      ) + shippingFee
    );
  }

  // Create a payment request
  requestPayment(dto: RequestPaymentDto): Observable<LinePayResponse> {
    const uri = '/v3/payments/request';
    const nonce = this.generateNonce();

    dto.packages.forEach((pkg) => {
      pkg.amount = pkg.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0,
      );
    });

    dto.amount = dto.packages.reduce(
      (total, pkg) => total + pkg.amount + (pkg.userFee || 0),
      0,
    );

    const body = {
      ...dto,
      redirectUrls: {
        confirmUrl: `${this.hostUrl}/payment/confirm`,
        cancelUrl: `${this.hostUrl}/payment/cancel`,
      },
    };

    const headers = {
      'Content-Type': 'application/json',
      'X-LINE-ChannelId': this.channelId,
      'X-LINE-Authorization-Nonce': nonce,
      'X-LINE-Authorization': this.generateSignature(uri, body, nonce),
    };

    return this.httpService
      .post<LinePayResponse>(`${this.linePayUrl}${uri}`, body, { headers })
      .pipe(map((response) => response.data));
  }
}
