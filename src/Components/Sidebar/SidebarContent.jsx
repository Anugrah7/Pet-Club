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


export const sidebarContent = {
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
        <Link to="/pets" className="text-white hover:text-amber-200">
        My Pets
      </Link>
    ),
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
 
};