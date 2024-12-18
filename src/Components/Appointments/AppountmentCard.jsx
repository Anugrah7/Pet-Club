import React from 'react';

function AppointmentCard({ appointment }) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="flex justify-between mb-1">
        <h3 className="font-medium">{appointment.service}</h3>
        <span className="text-sm text-gray-600">{appointment.time}</span>
      </div>
      <p className="text-sm text-gray-600">
        {appointment.date} • {appointment.provider}
      </p>
    </div>
  );
}

export default AppointmentCard;