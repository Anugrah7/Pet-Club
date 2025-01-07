import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import PetCard from './PetCard'; // Assuming PetCard is a separate component
import AddPetModal from '../Modal/AddPetModal';

function PetsSection({ pets = [], setPets, fetchPets }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">My Pets</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
        >
          <PlusCircle size={20} />
          Add Pet
        </button>
      </div>
      <div className="space-y-4">
        {pets.length === 0 ? (
          <p>No pets added yet. Click "Add Pet" to get started.</p>
        ) : (
          pets.map((pet) => (
            <PetCard key={pet.petId} pet={pet} />
          ))
        )}
      </div>
      <AddPetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fetchPets={fetchPets} // Pass fetchPets to the modal so it can refresh the list
      />
    </div>
  );
}

export default PetsSection;
