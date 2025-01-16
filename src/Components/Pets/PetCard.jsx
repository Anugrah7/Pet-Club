import { Trash } from 'lucide-react';
import React from 'react';
import { removePetAPI } from '../../../Services/allAPI';


function PetCard({ pet,fetchPets }) {

const removePet = async (id) => {
  const token = sessionStorage.getItem('token');
  if(token){
    const reqHeader = {
      "Authorization":`Bearer ${token}` 
    }
    try{
      const result = await removePetAPI(id,reqHeader)
      if(result.status === 200){
        alert("Pet removed successfully")
        fetchPets()
      }

    }catch(error){
      console.error("Error removing pet:",error)

}
}
}

  return (
    <div className="flex justify-around items-center gap-4 p-3 bg-gray-50 rounded-lg">
      <img
        src={pet.petImage}
        alt={pet.petName}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <h3 className="font-medium">{pet.petName}</h3>
        <p className="text-sm text-gray-600">{pet.petType}</p>
      </div>
      <Trash onClick={()=>removePet(pet._id)} size={23}/>      
    </div>
  );
}

export default PetCard;