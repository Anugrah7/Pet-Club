import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import Header from '../Components/Header/Header';
import PetsSection from '../Components/Pets/PetsSection';
import AppointmentsSection from '../Components/Appointments/AppointmentsSection';
import CommunitySection from '../Components/Community/CommunitySection';
import AddPetModal from '../Components/Modal/AddPetModal';

function OwnerDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pets, setPets] = useState([
    { id: 1, name: 'Max', type: 'Dog', image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1' },
    { id: 2, name: 'Luna', type: 'Cat', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba' },
  ]);

  const [appointments] = useState([
    { id: 1, service: 'Grooming', date: '2024-03-15', time: '10:00 AM', provider: 'PetSpa' },
    { id: 2, service: 'Vet Checkup', date: '2024-03-20', time: '2:30 PM', provider: 'Dr. Smith' },
  ]);

  const handleAddPet = (petData) => {
    setPets([...pets, { id: pets.length + 1, ...petData }]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 ml-0 md:ml-64 transition-all">
        <Header />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Pets Section */}
          <PetsSection pets={pets} onAddPet={() => setIsModalOpen(true)} />
          
          {/* Appointments Section */}
          <AppointmentsSection appointments={appointments} />
          
          {/* Community Section */}
          <CommunitySection />
        </div>
      </div>

      {/* Modal */}
      <AddPetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddPet}
      />
    </div>
  );
}

export default OwnerDashboard;
