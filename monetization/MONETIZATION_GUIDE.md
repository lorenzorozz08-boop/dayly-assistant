# 💰 Monetization Guide - Dayly App

## Strategie di Monetizzazione Consigliate

### 1. **Google AdMob** (Più Facile - Recommended)

#### Setup
```bash
# Web
npm install google-adsense

# Mobile (React Native)
npm install react-native-google-mobile-ads
```

#### Implementazione Web
```tsx
// packages/web/src/components/ads/AdBanner.tsx
import { useEffect } from 'react';

export default function AdBanner() {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
      data-ad-slot="1234567890"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
```

#### Posizionamento Strategico
- ✅ **Footer della Dashboard** - Non invasivo
- ✅ **Tra le liste** (ogni 5 item)
- ✅ **Sidebar inferiore** - Mobile
- ✅ **Interstitial ads** (tra pagine)
- ❌ **NON sopra il main content**
- ❌ **NON dentro i form**

#### Guadagni Stimati
```
- $5-15 per 1000 impressioni (CPM)
- Productivity app: CPM medio $8
- Con 10k users attivi: ~$80-150/mese
- Con 100k users: ~$800-1500/mese
```

---

## 2. **Premium Subscription** (Migliore UX)

### Tier Pricing Consigliato

```
📱 FREE (Gratis)
✓ To-Do List illimitato
✓ Ricordi (max 50)
✓ Appuntamenti (max 20)
✓ Nessuna pubblicità
✓ Offline support

💎 PREMIUM ($2.99/mese o $24.99/anno)
✓ Illimitato tutto
✓ Cloud sync avanzato
✓ Backup automático
✓ Export PDF
✓ Priorità support
✓ Tema premium
✓ Nessuna pubblicità
✓ Focus mode

🏢 PRO TEAM ($9.99/mese)
✓ Tutto Premium
✓ Team collaboration
✓ Condivisione attività
✓ Permessi custom
✓ Admin analytics
✓ API access
```

### Implementazione Stripe/RevenueCat

```bash
# Install
npm install @stripe/stripe-js stripe-react-native
npm install react-native-purchases  # RevenueCat
```

#### Service Subscription
```typescript
// packages/shared/src/services/subscription.service.ts
import { httpsCallable } from 'firebase/functions';

export class SubscriptionService {
  static async createSubscription(userId: string, plan: 'premium' | 'pro') {
    const createCheckout = httpsCallable(
      functions,
      'createCheckoutSession'
    );
    
    const result = await createCheckout({ plan, userId });
    return result.data;
  }

  static async getSubscription(userId: string) {
    // Leggi da Firestore
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.data()?.subscription;
  }
}
```

#### Paywall Component
```tsx
// packages/web/src/components/paywall/PremiumPaywall.tsx
import { Check } from 'lucide-react';
import { SubscriptionService } from '@dayly/shared';
import { useAuth } from '@dayly/shared';

const plans = [
  {
    name: 'Free',
    price: 'Gratis',
    period: '',
    features: [
      'To-Do List illimitato',
      'Ricordi (max 50)',
      'Offline support'
    ],
    button: 'Current Plan',
    disabled: true
  },
  {
    name: 'Premium',
    price: '$2.99',
    period: '/mese',
    features: [
      'Illimitato tutto',
      'Cloud sync',
      'Backup automático',
      'Export PDF',
      'Priorità support'
    ],
    button: 'Upgrade',
    recommended: true
  },
  {
    name: 'Pro Team',
    price: '$9.99',
    period: '/mese',
    features: [
      'Tutto Premium',
      'Team collaboration',
      'Condivisione attività',
      'Admin analytics',
      'API access'
    ],
    button: 'Upgrade',
  }
];

export default function PremiumPaywall() {
  const { user } = useAuth();

  const handleSubscribe = async (plan: string) => {
    try {
      const { url } = await SubscriptionService.createSubscription(
        user!.uid,
        plan as 'premium' | 'pro'
      );
      window.location.href = url;
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">💎 Upgrade to Premium</h1>
          <p className="text-xl text-gray-600">Sblocca il potenziale massimo di Dayly</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 transition-all ${
                plan.recommended
                  ? 'bg-white shadow-2xl ring-2 ring-indigo-600 scale-105'
                  : 'bg-white shadow-lg'
              }`}
            >
              {plan.recommended && (
                <div className="bg-indigo-600 text-white py-1 px-3 rounded-full text-sm font-bold mb-4 inline-block">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-600 ml-2">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="text-green-500" size={20} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(plan.name.toLowerCase())}
                disabled={plan.disabled}
                className={`w-full py-3 px-6 rounded-lg font-bold transition-all ${
                  plan.disabled
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : plan.recommended
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Domande Frequenti</h2>
          <div className="space-y-4">
            <details className="bg-white p-6 rounded-lg shadow-md">
              <summary className="font-bold cursor-pointer">Posso cancellare in qualsiasi momento?</summary>
              <p className="text-gray-600 mt-3">Sì, puoi cancellare l'abbonamento in qualsiasi momento dalle impostazioni. Non ci sono penalità.</p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-md">
              <summary className="font-bold cursor-pointer">Qual è la differenza tra Premium e Pro?</summary>
              <p className="text-gray-600 mt-3">Premium è per individui. Pro Team aggiunge collaborazione e team features per il lavoro di gruppo.</p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-md">
              <summary className="font-bold cursor-pointer">Ci sono prove gratuite?</summary>
              <p className="text-gray-600 mt-3">Sì! 14 giorni gratis di Premium per i nuovi utenti. Nessuna carta di credito richiesta.</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 3. **Hybrid Approach** (Consigliato) 🏆

### Strategia Ottimale

```
┌─────────────────────────────────────┐
│        FREE USERS (80%)             │
├─────────────────────────────────────┤
│ • Google AdMob (Banner + Interstitial)
│ • Soft paywall ogni 50 azioni
│ • "Upgrade" buttons strategici
│ • Limited features (max 50 ricordi)
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│      PREMIUM USERS (15%)            │
├─────────────────────────────────────┤
│ • NO ADS
│ • Illimitato tutto
│ • Cloud sync
│ • $2.99/mese
│ Revenue: 70%
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│      PRO TEAM USERS (5%)            │
├─────────────────────────────────────┤
│ • Team features
│ • Collaboration
│ • Admin analytics
│ • $9.99/mese
│ Revenue: 25%
└─────────────────────────────────────┘
```

### Revenue Projection

```
Scenario: 10,000 Utenti Attivi

80% Free (8,000 utenti)
├─ Google AdMob CPM: $8
├─ Impressioni/mese: 40,000 (5/utente)
├─ Guadagno: 40,000 × $8 ÷ 1000 = $320/mese
└─ Interstitial ads: +$200/mese
    Total Ads: $520/mese

15% Premium (1,500 utenti)
├─ Prezzo: $2.99/mese
├─ Retention: 70%
├─ Utenti attivi: 1,050
└─ Guadagno: 1,050 × $2.99 × 0.70 = $2,205/mese

5% Pro Team (500 utenti)
├─ Prezzo: $9.99/mese
├─ Retention: 80%
├─ Utenti attivi: 400
└─ Guadagno: 400 × $9.99 × 0.80 = $3,196/mese

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTALE MENSILE: $5,921/mese
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ANNUALE: $71,052/anno
```

---

## 4. **Best Practices per Ad Revenue** 📊

### Posizionamento Ads (Non Invasivo)

```tsx
// ✅ BUONI posizionamenti
<Footer>
  <AdBanner />  // Footer - 70% CTR
</Footer>

<SidebarBottom>
  <AdBanner />  // Sidebar - 45% CTR
</SidebarBottom>

// Tra lista (ogni 5 item)
{tasks.map((task, i) => (
  <>
    <TaskItem task={task} />
    {i % 5 === 4 && <AdBanner />}  // 40% CTR
  </>
))}

// ❌ CATTIVI posizionamenti (Avoid!)
// - Sopra main content
// - All'interno dei form
// - Troppi ads (>3 per pagina)
// - Autoplaying video ads
// - Pop-ups aggressivi
```

### Ad Types & Performance

```
📊 Display Ads
├─ Banner (300x250) - 60% CTR
├─ Leaderboard (728x90) - 35% CTR
└─ Skyscraper (120x600) - 25% CTR

🎯 Interstitial Ads
├─ Tra pagine - 85% CTR
├─ Frequency: Ogni 3-5 azioni
└─ Revenue: 3x vs banner

🎥 Native Ads
├─ Integrati nel design - 90% CTR
└─ Best for engagement

📱 Rewarded Video
├─ "Watch 15s for bonus" - 95% CTR
└─ Premium monetization
```

---

## 5. **Firestore Rules per Premium** 🔐

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      
      // Premium feature limits
      match /reminders/{doc=**} {
        allow read, write: if 
          request.auth.uid == userId &&
          (
            // Free: max 50
            (resource.data.subscription == 'free' && 
             query.count <= 50) ||
            // Premium/Pro: unlimited
            resource.data.subscription in ['premium', 'pro']
          );
      }
    }
  }
}
```

---

## 6. **Setup Completo Step-by-Step**

### Step 1: Google AdMob
```bash
# 1. Va su https://admob.google.com
# 2. Crea account Google
# 3. Aggiungi app web
# 4. Copia Ad Unit IDs:
#    - ca-pub-xxxxxxxxxxxxxxxx (Pub ID)
#    - /6355419/example/banner (Ad Slot)
```

### Step 2: Stripe Setup
```bash
# 1. Va su https://stripe.com
# 2. Crea account
# 3. Aggiungi prodotti:
#    - Premium: $2.99/mese
#    - Pro: $9.99/mese
# 4. Genera API keys
```

### Step 3: Firebase Functions
```bash
# Cloud Function per Stripe webhook
cd packages/firebase-functions
npm install stripe
```

### Step 4: Deploy
```bash
firebase deploy --only functions
```

---

## 7. **Revenue Tracking & Analytics** 📈

```typescript
// packages/shared/src/services/analytics.service.ts
export class AnalyticsService {
  static trackAdClick(adType: string, placement: string) {
    firebase.analytics().logEvent('ad_click', {
      ad_type: adType,
      placement: placement,
      timestamp: new Date()
    });
  }

  static trackSubscription(plan: string, price: number) {
    firebase.analytics().logEvent('purchase', {
      value: price,
      currency: 'USD',
      items: [{ item_id: plan }]
    });
  }

  static trackUserEngagement() {
    firebase.analytics().logEvent('engagement');
  }
}
```

---

## 💡 Tips per Massimizzare Guadagni

✅ **Do's**
- Offri FREE tier competitivo
- Soft paywall (after X actions)
- Trial period (14 giorni gratis)
- Rispetta user experience
- Trasparenza prezzi
- Ad relevance (contextual ads)
- Optimize for retention

❌ **Don'ts**
- Troppi ads (diminuisce retention)
- Clickbait ads
- Aggressive paywalls
- Bait & switch tactics
- Pop-ups auto-playing
- Slow ad loading
- Bury unsubscribe button

---

## 📊 Revenue by Strategy

```
Ads Only:     $100-500/mese per 10k users
Subscription: $1000-5000/mese per 10k users
Hybrid:       $5000-15000/mese per 10k users (BEST)
```

**La strategia HYBRID è la migliore!** 🎯
