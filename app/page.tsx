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
        </div>
      </div>
    </div>
  );
}
