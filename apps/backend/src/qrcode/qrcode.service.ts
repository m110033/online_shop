/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import * as QRCode from 'qrcode';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class QRCodeService {
  private collection: admin.firestore.CollectionReference;

  constructor(
    private readonly configService: ConfigService,
    private readonly firebase: FirebaseService,
  ) {
    this.collection = this.firebase.getFirestore().collection('qrcodes');
  }

  async generateQRCode(): Promise<string> {
    const randomCode = this.generateRandomCode();
    const domain = this.configService.get<string>('domain');
    const qrCodeUrl = `${domain}/qrcode/redeem?code=${randomCode}`;
    const qrCodeDataUrl: string = await QRCode.toDataURL(qrCodeUrl);

    await this.collection.doc(randomCode).set({
      redeemed: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return qrCodeDataUrl;
  }

  // 檢查 QR Code 是否已兌換過
  async redeemQRCode(code: string): Promise<boolean> {
    const qrCodeDoc = await this.collection.doc(code).get();

    if (!qrCodeDoc.exists) {
      throw new Error('QR Code not found');
    }

    const qrCodeData = qrCodeDoc.data();

    if (qrCodeData?.redeemed) {
      throw new Error('QR Code has already been redeemed');
    }

    const redeemAt = admin.firestore.FieldValue.serverTimestamp();

    await this.collection.doc(code).update({ redeemed: true, redeemAt });

    return true;
  }

  private generateRandomCode(): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      code += charset[randomIndex];
    }
    return code;
  }
}
