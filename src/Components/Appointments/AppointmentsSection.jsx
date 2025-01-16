import React from 'react';
import { Calendar } from 'lucide-react';
import AppointmentCard from '../Appointments/AppountmentCard';

function AppointmentsSection({ appointments }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Calendar size={20} className="text-indigo-600" />
        <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
      </div>
      <div className="space-y-4">
        {/* {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))} */}
      </div>
    </div>
  );
}

export default AppointmentsSection;