import { Injectable } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import { Auth } from 'firebase-admin/auth';
import { ConfigService } from '@nestjs/config';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { firestore } from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private firestore: Firestore;
  private auth: Auth;

  constructor(private readonly configService: ConfigService) {
    if (getApps().length === 0) {
      initializeApp({
        credential: cert(
          this.configService.get<string>('firebase.serviceKey') || '',
        ),
      });
    }
    this.firestore = firestore();
  }

  getFirestore() {
    return this.firestore;
  }

  getAuth() {
    return this.auth;
  }

  async getCollection(collectionName: string) {
    const snapshot = await this.firestore.collection(collectionName).get();
    return snapshot.docs.map((doc) => doc.data());
  }
}
