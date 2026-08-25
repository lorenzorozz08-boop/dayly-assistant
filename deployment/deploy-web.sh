#!/bin/bash

# Deploy script per Dayly Web App

echo "🌐 Deploying Dayly Web App..."

cd packages/web

echo "🔨 Building..."
npm run build

echo "📤 Deploying to Vercel..."
vercel --prod

echo "✅ Web app deployed successfully!"
