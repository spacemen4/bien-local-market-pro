interface StripeConfig {
  publishableKey: string;
  apiUrl: string;
  environment: 'development' | 'production' | 'test';
}

interface AppConfig {
  stripe: StripeConfig;
  api: {
    baseUrl: string;
    timeout: number;
  };
}

// Validation des variables d'environnement
const validateEnvVars = (): void => {
  const requiredVars = [
    'REACT_APP_STRIPE_PUBLISHABLE_KEY',
    'REACT_APP_API_URL'
  ];

  const missingVars = requiredVars.filter(
    varName => !process.env[varName]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Variables d'environnement manquantes: ${missingVars.join(', ')}\n` +
      'Assurez-vous d\'avoir un fichier .env.local avec toutes les variables requises.'
    );
  }
};

// Fonction pour vérifier que la clé est valide
const validateStripeKey = (key: string): boolean => {
  // Clé publique de test doit commencer par pk_test_
  // Clé publique de production doit commencer par pk_live_
  return key.startsWith('pk_test_') || key.startsWith('pk_live_');
};

// Configuration principale
const createConfig = (): AppConfig => {
  // Valider les variables d'environnement
  validateEnvVars();

  const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!;
  const apiUrl = process.env.REACT_APP_API_URL!;
  const environment = (process.env.REACT_APP_ENVIRONMENT || 'development') as 'development' | 'production' | 'test';

  // Valider la clé Stripe
  if (!validateStripeKey(stripePublishableKey)) {
    throw new Error('Clé Stripe publique invalide. Elle doit commencer par pk_test_ ou pk_live_');
  }

  // Avertissement pour les clés de test en production
  if (environment === 'production' && stripePublishableKey.startsWith('pk_test_')) {
    console.warn('⚠️ ATTENTION: Vous utilisez une clé de test en production!');
  }

  return {
    stripe: {
      publishableKey: stripePublishableKey,
      apiUrl,
      environment
    },
    api: {
      baseUrl: apiUrl,
      timeout: 10000 // 10 secondes
    }
  };
};

// Export de la configuration
export const config = createConfig();

// Export des clés individuelles pour la rétrocompatibilité
export const STRIPE_PUBLISHABLE_KEY = config.stripe.publishableKey;
export const API_BASE_URL = config.api.baseUrl;
export const ENVIRONMENT = config.stripe.environment;

// Types pour TypeScript
export type { StripeConfig, AppConfig };

// Utilitaires
export const isProduction = (): boolean => config.stripe.environment === 'production';
export const isDevelopment = (): boolean => config.stripe.environment === 'development';
export const isTestMode = (): boolean => config.stripe.publishableKey.startsWith('pk_test_');

// Helper pour les appels API
export const createApiUrl = (endpoint: string): string => {
  const baseUrl = config.api.baseUrl.replace(/\/$/, ''); // Supprimer le trailing slash
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

// Configuration par défaut pour les requêtes
export const defaultRequestConfig = {
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
};
