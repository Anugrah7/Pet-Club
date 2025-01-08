import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import Header from '../Components/Header/Header';
import PetsSection from '../Components/Pets/PetsSection';
import AppointmentsSection from '../Components/Appointments/AppointmentsSection';
import CommunitySection from '../Components/Community/CommunitySection';
import { getPetAPI } from '../../Services/allAPI';

function OwnerDashboard() {
  const [pets, setPets] = useState([]);
  const [appointments, setAppointments] = useState([
    { id: 1, service: 'Grooming', date: '2024-03-15', time: '10:00 AM', provider: 'PetSpa' },
    { id: 2, service: 'Vet Checkup', date: '2024-03-20', time: '2:30 PM', provider: 'Dr. Smith' },
  ]);

  // Define fetchPets inside OwnerDashboard
  const fetchPets = async () => {
    try {
      const response = await getPetAPI();  // API call to fetch pets
      console.log('Pets response:', response);
      if (response?.status === 200) {
        setPets(response.data.pets);  // Update the pets list after fetching
        console.log("pets length in parent component",response.data.pets.length)
      } else {
        console.error('Failed to fetch pets',response);
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  useEffect(() => {
    fetchPets();  // Fetch pets on component mount
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1 p-4 md:p-8 ml-0 md:ml-64 transition-all">
        <Header />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <PetsSection pets={pets} setPets={setPets} fetchPets={fetchPets} />  {/* Pass fetchPets here */}
          <AppointmentsSection appointments={appointments} />
          <CommunitySection />
        </div>
      </div>
    </div>
  );
}

export default OwnerDashboard;
