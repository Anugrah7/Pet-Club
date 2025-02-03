import { useContext, useEffect, useState } from 'react'
import './App.css'
import {  Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import OwnerDashboard from './Pages/OwnerDashboard'
import PetDetails from './Components/Pets/PetDetails'
import AppointmentDetail from './Components/Appointments/AppointmentDetail'
import CommunityPage from './Components/Community/CommunityPage'
import NotificationsPage from './Components/Notification/NotificationsPage'
import ProviderDashboard from './Pages/ProviderDashboard'
import MyServices from './Components/Provider/MyServices'
import Bookings from './Components/Provider/Bookings'
import Notifications from './Components/Provider/Notifications'
import { getPetAPI } from '../Services/allAPI'

// import { tokenContext } from './context/TokenAuth'



function App() {
  
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null); // For managing errors

  useEffect(() => {
    // Function to fetch pets data
    const fetchPets = async () => {
      const ownerData = JSON.parse(sessionStorage.getItem('user'));
      const ownerId = ownerData?._id; // Safely retrieve the _id field
  
      console.log('Owner Id:', ownerId);
  
      // if (!ownerId) {
      //   alert("Owner ID is missing. Please log in again.");
      //   return;
      // }
  
      try {
        const response = await getPetAPI(ownerId); // API call to fetch pets
        console.log('API Response:', response);
  
        // Ensure response.data contains the pet array
        if (response?.status === 200 && Array.isArray(response.data)) {
          setPets(response.data); // Set only the pet array to the pets state
        } else {
          console.error('Failed to fetch pets: Unexpected response format', response);
          setError('Failed to load pets. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching pets:', error);
        setError('An error occurred while fetching pets.');
      }
    };
  
    fetchPets(); 
  }, []); 
  

  return (
    <>

   <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/auth' element ={<Auth/>}/>
        
          <>
            <Route path='/dashboard/owner' element ={<OwnerDashboard/>}/>
            <Route path='/pets/:petId' element={<PetDetails pets={pets} />} />
            <Route path='/appointments' element ={<AppointmentDetail/>}/>
            <Route path='/community'element={<CommunityPage />}/>
            <Route path='/notifications'element={<NotificationsPage />}/>
            <Route path='/dashboard/provider'element={<ProviderDashboard />}/>
            <Route path='/myservices'element={<MyServices />}/>
            <Route path='/booking'element={<Bookings />}/>
            <Route path='/notification-provider'element={<Notifications />}/>
          </>
        
   </Routes>
    </>
  )
}

export default App
