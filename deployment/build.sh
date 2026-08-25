#!/bin/bash

# Build script per Dayly App - iOS e Android

echo "🚀 Starting Dayly App Build Process..."

cd packages/mobile

echo "📱 Installing dependencies..."
npm install

echo "🔐 Logging into EAS..."
eas login

echo "📦 Building for iOS App Store..."
eas build --platform ios --type app-store

echo "📦 Building for Android Google Play..."
eas build --platform android --type app-store

echo "✅ Build process complete!"
echo "📊 Check your builds at: https://expo.dev/"
