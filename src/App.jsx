import { useState } from 'react'
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


function App() {
const[loggedIn,setLoggedIn] = useState(false)

  return (
    <>

   <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/auth' element ={<Auth/>}/>
        <Route path='/dashboard/owner' element ={<OwnerDashboard/>}/>
        <Route path='/pets' element ={<PetDetails/>}/>
        <Route path='/appointments' element ={<AppointmentDetail/>}/>
        <Route path='/community'element={<CommunityPage />}/>
        <Route path='/notifications'element={<NotificationsPage />}/>
        <Route path='/dashboard/provider'element={<ProviderDashboard />}/>
        <Route path='/myservices'element={<MyServices />}/>
        <Route path='/booking'element={<Bookings />}/>
        <Route path='/notification-provider'element={<Notifications />}/>
   </Routes>
    </>
  )
}

export default App
