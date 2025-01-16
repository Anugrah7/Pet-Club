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
  const [error, setError] = useState('');

  // Fetch pets based on the owner ID
  const fetchPets = async () => {
    const ownerData = JSON.parse(sessionStorage.getItem('user'));
    const ownerId = ownerData?._id; // Safely retrieve the _id field
  
    console.log('Owner Id:', ownerId);
  
    if (!ownerId) {
      alert("Owner ID is missing. Please log in again.");
      return;
    }
  
    try {
      const response = await getPetAPI(ownerId);
      console.log('API Response:', response);
  
      // Ensure `response.data` contains the pet array
      if (response?.status === 200 && Array.isArray(response.data)) {
        setPets(response.data); // Set only the pet array to the `pets` state
      } else {
        console.error('Failed to fetch pets: Unexpected response format', response);
        setError('Failed to load pets. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
      setError('An error occurred while fetching pets.');
    }
  };
  
  
  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
        <div className="hidden md:block">
            <Sidebar pets={pets} />
        </div>
        <div className="flex-1 p-4 md:p-8 ml-0 md:ml-64 transition-all">
            <Header />
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <PetsSection pets={pets} setPets={setPets} fetchPets={fetchPets} />
                <AppointmentsSection />
                <CommunitySection />
            </div>
        </div>
    </div>
  );
}

export default OwnerDashboard;
