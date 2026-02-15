# Everdell Points Tracker 🌳

An interactive points tracker for the board game Everdell.

## Features
- Track up to 4 players
- Score categories: Cards, Prosperity, Events, Journey, Other
- Automatic total calculation
- Winner display
- Scoring reference guide

## How to Deploy

### Option 1: Netlify Drop (Easiest - No Code Required!)
1. Go to https://app.netlify.com/drop
2. Drag and drop the entire `everdell-tracker` folder
3. Your site will be live instantly!

### Option 2: GitHub Pages (If You Want Version Control)
1. Create a new repository on GitHub
2. Upload all these files to your repository
3. Go to Settings → Pages → Set Source to "GitHub Actions"
4. Push to main branch - site deploys automatically!

### Option 3: Local Development
```bash
npm install
npm run dev
```

Visit http://localhost:5173 to see it running locally.

## Build for Production
```bash
npm run build
```

The built files will be in the `dist` folder.
