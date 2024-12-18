import React from 'react';
import {  
  ListCheck,  
  Bell, 
  Briefcase, 
} from 'lucide-react';
import { Link } from 'react-router-dom';


export const SidebarContentProvider = {
  dashboard: {
    icon: <Briefcase size={20} />,
    label:(
        <Link to="/myservices" className="text-white hover:text-amber-200">
        My Services
      </Link>
    ),
    
  },
  appointments: {
    icon: <ListCheck size={20} />,
    label:(
        <Link to="/booking" className="text-white hover:text-amber-200">
        Booking
      </Link>
    ),
    
  },
  notifications: {
    icon: <Bell size={20} />,
    label:(
        <Link to="/notification-provider" className="text-white hover:text-amber-200">
        Notifications
      </Link>
    ),
   
  }
 
};