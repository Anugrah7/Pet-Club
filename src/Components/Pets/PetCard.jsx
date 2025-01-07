import React from 'react';

function PetCard({ pet }) {
  return (
    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
      <img
        src={`http://localhost:3000/upload/${pet.petImage}`}
        alt={pet.petName}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <h3 className="font-medium">{pet.petName}</h3>
        <p className="text-sm text-gray-600">{pet.petType}</p>
      </div>
    </div>
  );
}

export default PetCard;