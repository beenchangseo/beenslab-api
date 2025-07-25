// src/firebase/firebase.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';

@Injectable()
export class FirebaseService {
    private db: Firestore;

    constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseApp: any) {
        this.db = firebaseApp.firestore();
    }

    private getTodayDate(): string {
        return new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
    }

    private generateSVG(todayHits: number, totalHits: number): string {
        return `
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="20" role="img" aria-label="Hits">
                <linearGradient id="bg" x2="0" y2="100%">
                    <stop offset="0" stop-color="#444" stop-opacity=".1"/>
                    <stop offset="1" stop-opacity=".1"/>
                </linearGradient>
            <rect rx="3" width="200" height="20" fill="#555"/>
            <rect rx="3" x="70" width="130" height="20" fill="#007ec6"/>
            <rect rx="3" width="200" height="20" fill="url(#bg)"/>
                <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11">
                    <text x="35" y="14">Hits</text>
                    <text x="135" y="14">Today: ${todayHits} | Total: ${totalHits}</text>
                </g>
            </svg>`;
    }

    async getBlogVisitCounterHtml(postId: string, domain: string) {
        const docRef = this.db.collection('blog-hits').doc(domain).collection('posts').doc(postId);
        const today = this.getTodayDate();

        let totalHits = 1;
        let todayHits = 1;

        await this.db.runTransaction(async (t) => {
            const doc = await t.get(docRef);
            const data = doc.exists ? doc.data() || {} : {};

            const prevTotal = data.total_hits || 0;
            const prevToday = data.today_hits || 0;
            const lastDate = data.last_hits_date || '';

            totalHits = prevTotal + 1;
            todayHits = lastDate === today ? prevToday + 1 : 1;

            t.set(
                docRef,
                {
                    total_hits: totalHits,
                    today_hits: todayHits,
                    last_hits_date: today,
                },
                { merge: true },
            );
        });

        const svg = this.generateSVG(todayHits, totalHits);

        return svg;
    }
}
