import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Bell } from 'lucide-react';

function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'Vaccination',
      message: 'Rabies vaccine due in 3 days.',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'Grooming',
      message: 'Grooming appointment scheduled for December 20, 2024.',
      time: '1 day ago',
    },
    {
      id: 3,
      type: 'Task',
      message: 'Buy dog food - low on stock.',
      time: 'Just now',
    },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:block bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto p-6 mr-0">
        <div className="p-6 bg-white shadow-md rounded-lg">
       <div className='flex'>
            <Bell size={25} className=' text-indigo-700' />
              <h2 className="text-2xl font-bold text-indigo-700 mb-6 ml-1">Notifications</h2>
       </div>

          {/* Notifications Section */}
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-xl transition duration-300 hover:bg-amber-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded ${
                      notification.type === 'Vaccination'
                        ? 'bg-green-100 text-green-700'
                        : notification.type === 'Grooming'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {notification.type}
                  </span>
                  <span className="text-sm text-gray-500">{notification.time}</span>
                </div>
                <p className="text-gray-700">{notification.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;
