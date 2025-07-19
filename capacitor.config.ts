import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.d35d55f83def46ab963a3d74515c322f',
  appName: 'bday-oclock',
  webDir: 'dist',
  server: {
    url: 'https://d35d55f8-3def-46ab-963a-3d74515c322f.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a1a1a',
      showSpinner: false
    }
  }
};

export default config;