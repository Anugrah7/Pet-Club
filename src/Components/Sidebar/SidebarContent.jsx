import React from 'react';
import { 
  Home, 
  PawPrint, 
  Calendar, 
  MessageSquare, 
  Bell, 
  Settings, 
} from 'lucide-react';
import { Link } from 'react-router-dom';


export const sidebarContent = (pets = [])=>({
  dashboard: {
    icon: <Home size={20} />,
    label:(
        <Link to="/dashboard/owner" className="text-white hover:text-amber-200">
        Dashboard
      </Link>
    ),
    
  },
  pets: {
    icon: <PawPrint size={20} />,
    label:(
      <div>
        {pets.map((pet) => (
          <Link
            to={`/pets/${pet.petId}`}  // This passes the petId to the URL
            key={pet.petId}
            className="block text-white hover:text-amber-200"
          >
            {pet.petName || "My Pet"} {/* Display pet's name */}
          </Link>
        ))}
      </div>
    ) 
  },
  appointments: {
    icon: <Calendar size={20} />,
    label:(
        <Link to="/appointments" className="text-white hover:text-amber-200">
        Appointments
      </Link>
    ),
    
  },
  community: {
    icon: <MessageSquare size={20} />,
    label:(
        <Link to="/community" className="text-white hover:text-amber-200">
            Community
      </Link>
    ),
   
  },
  notifications: {
    icon: <Bell size={20} />,
    label:(
        <Link to="/notifications" className="text-white hover:text-amber-200">
        Notifications
      </Link>
    ),
   
  }
 
});