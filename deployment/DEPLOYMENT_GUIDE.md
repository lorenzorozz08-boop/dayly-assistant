# 🚀 Deployment Guide - App Store & Google Play Store

## Per iOS App Store

### Prerequisiti
- ✅ Apple Developer Account ($99/anno)
- ✅ Xcode installato
- ✅ Certificato di sviluppo
- ✅ Provisioning Profile
- ✅ TestFlight account

### Step-by-Step iOS

#### 1. Configurazione Expo
```bash
cd packages/mobile
npm install -g eas-cli
eas login
eas build --platform ios --auto-submit
```

#### 2. Crea App ID su Apple Developer
```
https://developer.apple.com/account/resources/identifiers/list
```
- Bundle ID: `com.dayly.app`
- App Name: "Dayly"
- Seleziona capabilities necessarie

#### 3. Genera Certificate
```bash
eas credentials
# Scegli iOS → Certificate → Crea nuovo
```

#### 4. Build per iOS
```bash
eas build --platform ios --type app-store
```

#### 5. Submit su App Store Connect
```bash
eas submit --platform ios
```

#### 6. App Store Review
- ✅ Nome app: "Dayly"
- ✅ Sottotitolo: "Assistente Personale Quotidiano"
- ✅ Descrizione (3000 caratteri max)
- ✅ Screenshot (2-5)
- ✅ Preview video (15-30 sec)
- ✅ Categoria: Productivity
- ✅ Rating: Non contiene contenuti espliciti
- ✅ Prezzo: Gratuito
- ✅ Privacy Policy URL

---

## Per Android Google Play Store

### Prerequisiti
- ✅ Google Play Developer Account ($25 una volta)
- ✅ Google Play Console access
- ✅ Keystore file per firma

### Step-by-Step Android

#### 1. Crea Keystore
```bash
cd packages/mobile
keytool -genkey -v -keystore dayly-release.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias dayly-key
```

#### 2. Configura Expo per Android
```bash
eas build --platform android --auto-submit
```

#### 3. Build per Google Play
```bash
eas build --platform android --type app-store
```

#### 4. Crea App su Google Play Console
```
https://play.google.com/console
```
- Nome: "Dayly"
- Package name: `com.dayly.app`
- Categoria: Productivity
- Contenuto: Non rated

#### 5. Upload Build
- Carica il file `.aab` (Android App Bundle)
- Compila descrizione breve (80 char)
- Compila descrizione completa (4000 char)

#### 6. Screenshot e Preview
- Phone: 5.5" (1440x2560) - 2-8 screenshot
- Tablet: 7" (1200x1920) - 2-8 screenshot
- Preview video (15-45 sec)

#### 7. Content Rating Questionnaire
- Seleziona categoria di contenuto
- Rispondi domande (Dayly è sicura)

#### 8. Privacy & Permissions
- ✅ Privacy policy URL
- ✅ Politica sui dati
- ✅ Permessi richiesti

#### 9. Prezzo e Distribuzione
- Gratuito
- Disponibile in tutti i paesi
- Target minimo Android: API 24

#### 10. Beta Test (Opzionale)
```bash
# Internal Testing
https://play.google.com/console → Internal testing track

# Closed Testing
Invita tester specifici

# Open Testing
Rendi disponibile a chiunque con link
```

---

## Web App (Vercel/Firebase Hosting)

### Deploy su Vercel

```bash
cd packages/web
vercel login
vercel
```

#### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_FIREBASE_API_KEY": "@firebase_api_key",
    "VITE_FIREBASE_AUTH_DOMAIN": "@firebase_auth_domain",
    "VITE_FIREBASE_PROJECT_ID": "@firebase_project_id",
    "VITE_FIREBASE_STORAGE_BUCKET": "@firebase_storage_bucket",
    "VITE_FIREBASE_MESSAGING_SENDER_ID": "@firebase_messaging_sender_id",
    "VITE_FIREBASE_APP_ID": "@firebase_app_id"
  }
}
```

### Deploy su Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy --only hosting
```

---

## Desktop App (Electron)

### Build per macOS, Windows, Linux

```bash
cd packages/desktop
npm run build:mac      # macOS
npm run build:win      # Windows
npm run build:linux    # Linux
```

### Distribuire su:
- **macOS**: Mac App Store o direct download
- **Windows**: Microsoft Store o GitHub Releases
- **Linux**: Snap Store, AppImage, o direct

---

## App Store Listing Template

### Nome App
```
Dayly - Assistente Personale Quotidiano
```

### Sottotitolo (iOS)
```
Gestisci attività, ricordi e appuntamenti
```

### Descrizione Breve
```
📅 Dayly è il tuo assistente personale che ti aiuta a:
✅ Organizzare attività e scadenze
🧠 Non dimenticare cose importanti
📝 Gestire appuntamenti e commissioni
```

### Descrizione Completa
```
🎯 ORGANIZZA LA TUA GIORNATA
Dayly è l'app perfetta per chi vuole restare organizzato e produttivo.

✨ FEATURE PRINCIPALI:

📋 Attività & To-Do List
- Aggiungi attività con priorità
- Categorie (lavoro, salute, personale, errandi)
- Attività ricorrenti
- Segna come completate

🧠 Ricordi Importanti
- "Ricordami di comprare il latte"
- "Ho prestato 20€ a Marco"
- "Devo portare documento domani"
- "Devo rinnovare abbonamento venerdì"

📅 Calendario Appuntamenti
- Aggiungi appuntamenti con orario
- Promemoria prima dell'evento
- Visualizzazione mensile
- Sincronizzazione multi-device

💾 Salvataggio Locale
- I dati sono salvati localmente nel tuo dispositivo
- Accesso offline garantito
- Sincronizzazione cloud con Firebase

🔐 Sicurezza
- Autenticazione con email/password
- Login con Google e Apple
- Dati criptati e privati
- Solo tu accedi ai tuoi dati

🌙 Interfaccia Intuitiva
- Design moderno e user-friendly
- Tema chiaro e scuro
- Notifiche push
- Disponibile su Web, iOS, Android

📱 Multi-Piattaforma
- Sincronizza su tutti i tuoi dispositivi
- Accedi da browser, smartphone, tablet
- Nessuna pubblicità
- Completamente gratuito

Scarica Dayly oggi e trasforma il modo in cui organizzi la tua vita!
```

### Parole Chiave
```
to-do list, attività, calendario, ricordi, organizzazione, produttività, appuntamenti, promemoria, planner, task manager
```

### Category
```
Productivity
```

### Content Rating
```
4+ (iOS) / Everyone (Android)
```

### Privacy Policy
```
https://dayly-app.com/privacy
```

### Support URL
```
https://dayly-app.com/support
```

---

## Timeline Approvazione

### iOS App Store
- ⏱️ Review time: 24-48 ore (solitamente)
- 🎯 Dopo approvazione: Disponibile in 1 ora
- 📊 Visibilità: Immediata in App Store

### Google Play Store
- ⏱️ Review time: 2 ore - 7 giorni
- 🎯 Solitamente 24 ore
- 📊 Visibilità: Immediata nella Play Store

---

## Post-Launch Checklist

- ✅ Monitora reviews e ratings
- ✅ Rispondi a feedback degli utenti
- ✅ Traccia crash e errori (Sentry/Firebase Crashlytics)
- ✅ Analizza usage (Firebase Analytics)
- ✅ Aggiorna app regolarmente
- ✅ Mantieni privacy policy aggiornata
- ✅ Supporto clienti (email, chat)
- ✅ Marketing e promozione

---

## Link Utili

- [Apple App Store Connect](https://appstoreconnect.apple.com/)
- [Google Play Console](https://play.google.com/console/)
- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [Firebase Console](https://console.firebase.google.com/)
- [Vercel Dashboard](https://vercel.com/dashboard)
