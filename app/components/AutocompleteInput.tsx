"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useAutocomplete } from '../hooks/useAutocomplete';
import { PlacePrediction } from '../services/googlePlaces';

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (prediction: PlacePrediction) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  value,
  onChange,
  onSelect,
  placeholder = "Destino",
  className = "",
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    predictions,
    loading,
    error,
    searchPredictions,
    clearPredictions
  } = useAutocomplete({ delay: 300, minLength: 2 });

  // Busca predições quando o valor muda
  useEffect(() => {
    if (value.length >= 2) {
      searchPredictions(value);
      setIsOpen(true);
    } else {
      clearPredictions();
      setIsOpen(false);
    }
  }, [value, searchPredictions, clearPredictions]);

  // Fecha dropdown quando clica fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navegação com teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || predictions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < predictions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < predictions.length) {
          handleSelect(predictions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelect = (prediction: PlacePrediction) => {
    onChange(prediction.description);
    onSelect?.(prediction);
    setIsOpen(false);
    setSelectedIndex(-1);
    clearPredictions();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setSelectedIndex(-1);
  };

  const formatPrediction = (prediction: PlacePrediction) => {
    const { main_text, secondary_text } = prediction.structured_formatting;
    return (
      <div className="flex flex-col">
        <span className="font-medium text-gray-900">{main_text}</span>
        {secondary_text && (
          <span className="text-sm text-gray-500">{secondary_text}</span>
        )}
      </div>
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (predictions.length > 0) setIsOpen(true);
          }}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all ${className}`}
        />
        
        {/* Ícone de busca */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500"></div>
          ) : (
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
      </div>

      {/* Dropdown de sugestões */}
      {isOpen && (predictions.length > 0 || error) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {error ? (
            <div className="px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : (
            <div>
              {predictions.map((prediction, index) => (
                <button
                  key={prediction.place_id}
                  onClick={() => handleSelect(prediction)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                    index === selectedIndex ? 'bg-gray-50' : ''
                  } ${index === 0 ? 'rounded-t-lg' : ''} ${
                    index === predictions.length - 1 ? 'rounded-b-lg' : ''
                  }`}
                >
                  {formatPrediction(prediction)}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 