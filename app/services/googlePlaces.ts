import { config } from './config';

// Tipos para a API do Google Places
export interface PlacePrediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  types: string[];
}

export interface GooglePlacesResponse {
  predictions: PlacePrediction[];
  status: string;
}

// Configuração da API
const GOOGLE_PLACES_API_KEY = config.googlePlaces.apiKey;
const GOOGLE_PLACES_BASE_URL = config.googlePlaces.baseUrl;

export class GooglePlacesService {
  private static instance: GooglePlacesService;
  private cache: Map<string, PlacePrediction[]> = new Map();

  public static getInstance(): GooglePlacesService {
    if (!GooglePlacesService.instance) {
      GooglePlacesService.instance = new GooglePlacesService();
    }
    return GooglePlacesService.instance;
  }

  /**
   * Busca sugestões de lugares baseado no input do usuário
   */
  async getPlacePredictions(input: string): Promise<PlacePrediction[]> {
    if (!GOOGLE_PLACES_API_KEY) {
      console.warn('Google Places API Key não configurada');
      return [];
    }

    // Verifica cache primeiro
    const cacheKey = input.toLowerCase().trim();
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      const response = await fetch(
        `${GOOGLE_PLACES_BASE_URL}/autocomplete/json?` +
        `input=${encodeURIComponent(input)}` +
        `&types=(cities)` +
        `&language=pt-BR` +
        `&key=${GOOGLE_PLACES_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GooglePlacesResponse = await response.json();

      if (data.status === 'OK') {
        // Filtra apenas cidades e estados
        const filteredPredictions = data.predictions.filter(prediction => 
          prediction.types.some(type => 
            ['locality', 'administrative_area_level_1', 'administrative_area_level_2'].includes(type)
          )
        );

        // Cache dos resultados
        this.cache.set(cacheKey, filteredPredictions);
        
        return filteredPredictions;
      } else {
        console.error('Google Places API error:', data.status);
        return [];
      }
    } catch (error) {
      console.error('Erro ao buscar lugares:', error);
      return [];
    }
  }

  /**
   * Busca detalhes de um lugar específico pelo place_id
   */
  async getPlaceDetails(placeId: string) {
    if (!GOOGLE_PLACES_API_KEY) {
      console.warn('Google Places API Key não configurada');
      return null;
    }

    try {
      const response = await fetch(
        `${GOOGLE_PLACES_BASE_URL}/details/json?` +
        `place_id=${placeId}` +
        `&fields=formatted_address,geometry,name,place_id` +
        `&language=pt-BR` +
        `&key=${GOOGLE_PLACES_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Erro ao buscar detalhes do lugar:', error);
      return null;
    }
  }

  /**
   * Limpa o cache
   */
  clearCache() {
    this.cache.clear();
  }
}

// Exporta uma instância singleton
export const googlePlacesService = GooglePlacesService.getInstance(); 