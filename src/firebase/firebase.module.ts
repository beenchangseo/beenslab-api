// src/firebase/firebase.module.ts
import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseService } from './firebase.service';

const firebaseAdminProvider = (): admin.app.App => {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!serviceAccountJson) throw new Error('Missing FIREBASE_SERVICE_ACCOUNT');
    const serviceAccount = JSON.parse(serviceAccountJson);

    const firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });

    return firebaseApp;
};

@Global()
@Module({
    providers: [
        {
            provide: 'FIREBASE_ADMIN',
            useValue: firebaseAdminProvider(),
        },
        FirebaseService,
    ],
    exports: ['FIREBASE_ADMIN', FirebaseService],
})
export class FirebaseModule {}
