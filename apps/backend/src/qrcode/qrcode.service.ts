/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import * as QRCode from 'qrcode';
import { FirebaseService } from 'src/firebase/firebase.service';
import { QRCodeEnum } from './enums/qrcode.enum';
import { QRCodeStatus } from './interfaces/qrcode-status.interface';

@Injectable()
export class QRCodeService {
  private collection: admin.firestore.CollectionReference;

  constructor(
    private readonly configService: ConfigService,
    private readonly firebase: FirebaseService,
  ) {
    this.collection = this.firebase.getFirestore().collection('qrcodes');
  }

  async getQRCodeList(redeemed?: boolean): Promise<QRCodeStatus[]> {
    let snapshot: admin.firestore.QuerySnapshot;

    if (typeof redeemed !== 'undefined') {
      snapshot = await this.collection.where('redeemed', '==', redeemed).get();
    } else {
      snapshot = await this.collection.get();
    }

    const qrcodes = snapshot.docs.map((s) => ({
      id: s.id,
      redeemed: s.data().redeemed,
    }));

    return qrcodes;
  }

  async generateQRcodes(length: number): Promise<boolean> {
    const qrCodesDataUrls: string[] = [];
    const domain = this.configService.get<string>('domain');

    const l = length || 1;

    for (let i = 0; i < l; i++) {
      const randomCode = this.generateRandomCode();
      const qrCodeUrl = `${domain}/qrcode/redeem?code=${randomCode}`;

      const qrCodeDataUrl: string = await QRCode.toDataURL(qrCodeUrl);
      qrCodesDataUrls.push(qrCodeDataUrl);

      // Save the QR Code to Firebase
      await this.collection.doc(randomCode).set({
        redeemed: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    return true;
  }

  async checkQRCode(code: string): Promise<QRCodeEnum> {
    let status = QRCodeEnum.NONE;

    const qrCodeDoc = await this.collection.doc(code).get();

    if (!qrCodeDoc.exists) {
      return status;
    }

    const qrCodeData = qrCodeDoc.data();

    if (qrCodeData?.redeemed) {
      status = QRCodeEnum.REDEEMED;
    } else {
      status = QRCodeEnum.AVAILABLE;
    }

    return status;
  }

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
