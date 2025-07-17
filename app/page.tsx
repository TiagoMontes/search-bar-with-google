"use client";

import { useState } from "react";
import Image from "next/image";
import { AutocompleteInput } from "./components";
import { PlacePrediction } from "./services";

export default function Home() {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<PlacePrediction | null>(null);

  const handleSearch = () => {
    // Aqui você pode implementar a lógica de busca
    console.log("Buscar:", { 
      location, 
      checkIn, 
      checkOut, 
      guests,
      selectedPlace 
    });
  };

  const updateGuests = (type: string, action: "add" | "subtract") => {
    setGuests(prev => {
      if (type === "adults") {
        return action === "add" ? prev + 1 : Math.max(1, prev - 1);
      }
      return prev;
    });
  };

  const handlePlaceSelect = (prediction: PlacePrediction) => {
    setSelectedPlace(prediction);
    console.log("Local selecionado:", prediction);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            SearchFinder
          </h1>
          <p className="text-gray-600">
            Encontre o lugar perfeito para sua viagem
          </p>
        </div>

        <div className="space-y-6">
          {/* Campo de Localização com Autocomplete */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Para onde?
            </label>
            <AutocompleteInput
              value={location}
              onChange={setLocation}
              onSelect={handlePlaceSelect}
              placeholder="Digite o destino (ex: Rio B, São Paulo, etc.)"
              className="w-full"
            />
            {selectedPlace && (
              <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Local selecionado:</strong> {selectedPlace.description}
                </p>
              </div>
            )}
          </div>

          {/* Campos de Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-in
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Seletor de Hóspedes */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hóspedes
            </label>
            <button
              onClick={() => setShowGuestSelector(!showGuestSelector)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-left flex justify-between items-center"
            >
              <span>{guests} hóspede{guests !== 1 ? 's' : ''}</span>
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Guest Selector Dropdown */}
            {showGuestSelector && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Adultos</div>
                      <div className="text-sm text-gray-500">13 anos ou mais</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateGuests("adults", "subtract")}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-8 text-center">{guests}</span>
                      <button
                        onClick={() => updateGuests("adults", "add")}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Botão de Busca */}
          <button
            onClick={handleSearch}
            className="w-full bg-red-500 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-red-600 transition-colors duration-200 transform hover:scale-105"
          >
            Buscar Acomodações
          </button>
        </div>

        {/* Informações sobre a API */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            💡 Como usar o autocomplete:
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Digite pelo menos 2 caracteres para ver sugestões</li>
            <li>• Use as setas do teclado para navegar</li>
            <li>• Pressione Enter para selecionar</li>
            <li>• Exemplo: digite "Rio B" para ver "Rio Branco, AC, Brasil"</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
