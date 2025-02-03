import React, { useEffect, useState } from 'react';
import SidebarProvider from '../Components/Sidebar/SidebarProvider'; // Ensure the correct path to your SidebarProvider component

const ProviderDashboard = () => {

  const [username,SetUsername] = useState("")
  
    useEffect(()=>{
      if(sessionStorage.getItem("user")){
      SetUsername(JSON.parse(sessionStorage.getItem("user")).username.split(" ")[0])
      }  
    },[])

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarProvider />

      {/* Main Content */}
      <div className="flex-1 p-6 ml-64">
        <header className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h1 className="text-2xl font-bold text-indigo-700">{username}'s Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome to your dashboard. Manage your services, bookings, and notifications here.</p>
        </header>

        {/* Dashboard Content Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card Example */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold text-indigo-700">My Services</h2>
            <p className="text-gray-600 mt-2">
              Manage your offered services. Add, update, or delete services as needed.
            </p>
          </div>

          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold text-indigo-700">Bookings</h2>
            <p className="text-gray-600 mt-2">
              View and manage bookings made by pet owners.
            </p>
          </div>

          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold text-indigo-700">Notifications</h2>
            <p className="text-gray-600 mt-2">
              View and send notifications to pet owners regarding appointments or updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
