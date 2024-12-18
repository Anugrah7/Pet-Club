import React from 'react';
import { PlusCircle } from 'lucide-react';
import PetCard from './PetCard';

function PetsSection({ pets, onAddPet }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">My Pets</h2>
        <button
          onClick={onAddPet}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
        >
          <PlusCircle size={20} />
          Add Pet
        </button>
      </div>
      <div className="space-y-4">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
}

export default PetsSection;