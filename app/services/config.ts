// Configurações da aplicação
export const config = {
  // Google Places API
  googlePlaces: {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY,
    baseUrl: 'https://maps.googleapis.com/maps/api/place',
    autocompleteDelay: 300,
    minInputLength: 2,
  },
  
  // Configurações da aplicação
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'SearchFinder',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  },
  
  // Configurações de cache
  cache: {
    maxSize: 100,
    ttl: 5 * 60 * 1000, // 5 minutos
  },
};

// Validação das configurações
export const validateConfig = () => {
  const errors: string[] = [];
  
  if (!config.googlePlaces.apiKey) {
    errors.push('NEXT_PUBLIC_GOOGLE_PLACES_API_KEY não está configurada');
  }
  
  if (errors.length > 0) {
    console.warn('Configurações ausentes:', errors);
    return false;
  }
  
  return true;
}; 