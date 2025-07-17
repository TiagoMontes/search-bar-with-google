import { useState, useEffect, useCallback, useRef } from 'react';
import { googlePlacesService, PlacePrediction } from '../services/googlePlaces';

interface UseAutocompleteProps {
  delay?: number;
  minLength?: number;
}

interface UseAutocompleteReturn {
  predictions: PlacePrediction[];
  loading: boolean;
  error: string | null;
  searchPredictions: (input: string) => void;
  clearPredictions: () => void;
}

export const useAutocomplete = ({ 
  delay = 300, 
  minLength = 2 
}: UseAutocompleteProps = {}): UseAutocompleteReturn => {
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const searchPredictions = useCallback(async (input: string) => {
    // Limpa timeout anterior
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Reseta estados
    setError(null);
    
    // Se input muito curto, limpa predições
    if (input.length < minLength) {
      setPredictions([]);
      setLoading(false);
      return;
    }

    // Debounce da busca
    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      
      try {
        const results = await googlePlacesService.getPlacePredictions(input);
        setPredictions(results);
        setError(null);
      } catch (err) {
        setError('Erro ao buscar destinos');
        setPredictions([]);
      } finally {
        setLoading(false);
      }
    }, delay);
  }, [delay, minLength]);

  const clearPredictions = useCallback(() => {
    setPredictions([]);
    setError(null);
    setLoading(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  // Cleanup no unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    predictions,
    loading,
    error,
    searchPredictions,
    clearPredictions
  };
}; 