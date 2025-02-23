import { Module } from '@nestjs/common';
import { QRCodeService } from './qrcode.service';
import { QRCodeController } from './qrcode.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [QRCodeController],
  providers: [QRCodeService],
})
export class QRCodeModule {}
