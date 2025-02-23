import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { FirebaseService } from './firebase/firebase.service';
// import { FirebaseModule } from './firebase/firebase.module';
import { QRCodeModule } from './qrcode/qrcode.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // LineBotModule,
    // LinePayModule,
    QRCodeModule,
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseService],
})
export class AppModule {}
