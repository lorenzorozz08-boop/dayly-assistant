# 🔥 Firebase Configuration Guide

## 1. Creare Progetto Firebase

### Step 1: Go Firebase Console
1. Vai su https://console.firebase.google.com/
2. Clicca **"Crea Progetto"**
3. Nomina: `Dayly` (o come preferisci)
4. Disabilita Google Analytics (facoltativo)
5. Clicca **"Crea Progetto"**

### Step 2: Abilitare Servizi

#### Authentication
1. Vai a **Authentication** → **Introduzione**
2. Abilita questi provider:
   - **Email/Password**
   - **Google**
   - **Apple** (se support iOS)
   - **Facebook** (opzionale)

#### Firestore Database
1. Vai a **Firestore Database**
2. Clicca **"Crea database"**
3. Seleziona **Modalità di test** (per sviluppo)
4. Scegli location **europe-west1** (eur4 - Belgio)
5. Clicca **"Abilita"**

#### Realtime Database
1. Vai a **Realtime Database**
2. Clicca **"Crea database"**
3. Seleziona **Modalità di test**
4. Scegli location **eur4**
5. Clicca **"Abilita"**

#### Cloud Storage
1. Vai a **Storage**
2. Clicca **"Inizia"**
3. Seleziona **Modalità di test**
4. Clicca **"Fatto"**

#### Cloud Functions
1. Vai a **Functions**
2. Clicca **"Inizia"**
3. Seleziona Node.js runtime
4. Clicca **"Avanti"**

## 2. Scaricare Credenziali

### Web App Config
1. Vai a **Project Settings** (icona gear)
2. Seleziona tab **"Le tue app"**
3. Clicca **"Aggiungi app"** → **Web**
4. Registra come `dayly-web`
5. Copia il config:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID"
};
```

### Service Account Key
1. Vai a **Project Settings** → **Service Accounts**
2. Clicca **"Generate New Private Key"**
3. Salva il file JSON come `firebase-key.json`
4. **⚠️ IMPORTANTE**: Aggiungi a `.gitignore`!

## 3. Creare File di Configurazione

### `.env.local` (nella root)
```env
# Firebase Web Config
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID

# Optional
VITE_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
```

### `packages/shared/firebase.config.ts`
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getRealtimeDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDb = getRealtimeDatabase(app);
export const storage = getStorage(app);
```

## 4. Configurare Firestore Rules

Vai a **Firestore Database** → **Regole** e sostituisci con:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User documents - only user can access own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      
      // User's tasks
      match /tasks/{taskId} {
        allow read, write: if request.auth.uid == userId;
        allow delete: if request.auth.uid == userId;
      }
      
      // User's reminders
      match /reminders/{reminderId} {
        allow read, write: if request.auth.uid == userId;
        allow delete: if request.auth.uid == userId;
      }
      
      // User's appointments
      match /appointments/{appointmentId} {
        allow read, write: if request.auth.uid == userId;
        allow delete: if request.auth.uid == userId;
      }
      
      // User's notes
      match /notes/{noteId} {
        allow read, write: if request.auth.uid == userId;
        allow delete: if request.auth.uid == userId;
      }
    }
  }
}
```

## 5. Configurare Realtime Database Rules

Vai a **Realtime Database** → **Regole** e sostituisci con:

```javascript
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

## 6. Configurare Cloud Storage Rules

Vai a **Storage** → **Regole** e sostituisci con:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

## 7. Configurare Cloud Functions

### Installa Firebase CLI
```bash
npm install -g firebase-tools
```

### Login Firebase
```bash
firebase login
```

### Inizializza Functions nel progetto
```bash
cd packages/firebase-functions
firebase init functions
```

### Deploy Functions
```bash
firebase deploy --only functions
```

## 8. Creare Indici Firestore

Per query ottimizzate, crea questi indici:

### Index per Tasks
**Collection**: `users/{userId}/tasks`
**Campi**:
- `category` (Ascendente)
- `dueDate` (Ascendente)

**Collection**: `users/{userId}/tasks`
**Campi**:
- `priority` (Ascendente)
- `completed` (Ascendente)

### Index per Reminders
**Collection**: `users/{userId}/reminders`
**Campi**:
- `priority` (Ascendente)
- `dueDate` (Ascendente)

## 9. Verificare Configurazione

### Test in Console
1. Vai a **Firestore Database**
2. Clicca **"Avvia raccolta"**
3. Nomina: `test-collection`
4. Aggiungi documento di test
5. Verifica che puoi leggere/scrivere

### Test con SDK
```javascript
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from './firebase.config';

// Test write
await setDoc(doc(db, 'test', 'doc1'), {
  message: 'Hello Dayly!',
  timestamp: new Date()
});

// Test read
const docSnap = await getDoc(doc(db, 'test', 'doc1'));
console.log(docSnap.data());
```

## 10. Setup per Sviluppo Locale

### Usare Firebase Emulator (Opzionale)

```bash
# Installa Firebase Emulator Suite
firebase init emulator

# Seleziona:
# - Firestore
# - Realtime Database
# - Storage
# - Functions
# - Authentication

# Avvia emulator
firebase emulators:start
```

### Connettere App a Emulator
```javascript
if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectStorageEmulator(storage, 'localhost', 9199);
}
```

## 11. Backup e Ripristino

### Backup Automatico
1. Vai a **Firestore Database**
2. Menu **Backup e ripristino**
3. Abilita backup automatici

### Backup Manuale
```bash
firebase firestore:export ./backups/backup.export.json
```

### Ripristino
```bash
firebase firestore:import ./backups/backup.export.json
```

## 12. Monitoraggio e Logging

### Abilitare Logging
1. Vai a **Logging**
2. Crea filtro:
   ```
   resource.type="cloud_function"
   severity="ERROR"
   ```

### Visualizzare Usage
1. Vai a **Usage and Billing**
2. Configura alerts per quota

## 🆘 Troubleshooting

### "Permission denied" Error
- Verifica Firestore Rules
- Controlla che user sia autenticato
- Testa con Firestore Emulator

### "App initialization failed"
- Verifica `.env.local` con credenziali corrette
- Ricontrolla capitalization (case-sensitive!)

### "Quotas exceeded"
- Upgrade da Spark a Blaze plan
- Aggiungi billing alert

## 🔐 Security Checklist

- ✅ Firestore Rules configurate correttamente
- ✅ Realtime Database Rules configurate
- ✅ Storage Rules configurate
- ✅ firebase-key.json in .gitignore
- ✅ Environment variables non commesse
- ✅ CORS configurato se necessario
- ✅ Rate limiting abilitato
