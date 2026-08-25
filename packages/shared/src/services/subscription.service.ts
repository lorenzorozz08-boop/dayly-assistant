// packages/shared/src/services/subscription.service.ts
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface Subscription {
  plan: 'free' | 'premium' | 'pro';
  stripeId?: string;
  startDate: Date;
  renewalDate: Date;
  status: 'active' | 'canceled' | 'expired';
  autoRenew: boolean;
}

export class SubscriptionService {
  static async getSubscription(userId: string): Promise<Subscription | null> {
    try {
      const docSnap = await getDoc(
        doc(db, 'users', userId, 'subscription', 'current')
      );
      return (docSnap.data() as Subscription) || null;
    } catch (error) {
      console.error('Failed to fetch subscription:', error);
      return null;
    }
  }

  static async isPremium(userId: string): Promise<boolean> {
    const subscription = await this.getSubscription(userId);
    return (
      !!subscription &&
      (subscription.plan === 'premium' || subscription.plan === 'pro') &&
      subscription.status === 'active'
    );
  }

  static async createCheckoutSession(
    userId: string,
    plan: 'premium' | 'pro'
  ): Promise<{ url: string }> {
    // Call Firebase Cloud Function
    const response = await fetch(
      `/api/createCheckoutSession`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, plan }),
      }
    );
    return response.json();
  }

  static async cancelSubscription(userId: string): Promise<void> {
    try {
      await updateDoc(
        doc(db, 'users', userId, 'subscription', 'current'),
        {
          status: 'canceled',
          canceledAt: new Date(),
        }
      );
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      throw error;
    }
  }
}
