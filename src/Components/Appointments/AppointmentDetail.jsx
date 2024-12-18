import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import BookAppointment from './BookAppointment'; // import BookAppointment component

function AppointmentDetail({ appointment, providers, services, onSubmit }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:block bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto p-6">
        {appointment ? (
          <div className="p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto mt-10">
            <h2 className="text-xl font-bold text-indigo-700 mb-4">Appointment Details</h2>

            <div className="mb-4">
              <span className="block text-sm text-gray-500">Service:</span>
              <p className="text-lg font-medium">{appointment.serviceName}</p>
            </div>

            <div className="mb-4">
              <span className="block text-sm text-gray-500">Provider:</span>
              <p className="text-lg font-medium">{appointment.providerName}</p>
            </div>

            <div className="mb-4">
              <span className="block text-sm text-gray-500">Date & Time:</span>
              <p className="text-lg font-medium">
                {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
              </p>
            </div>

            <div className="mb-4">
              <span className="block text-sm text-gray-500">Pet:</span>
              <p className="text-lg font-medium">{appointment.petName}</p>
            </div>

            <div className="mb-4">
              <span className="block text-sm text-gray-500">Notes:</span>
              <p className="text-gray-700">{appointment.notes || 'No additional notes provided.'}</p>
            </div>

            <button
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
              onClick={() => console.log('Cancel appointment clicked')}
            >
              Cancel Appointment
            </button>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            {/* If no appointment exists, display the booking form */}
            <h3 className="text-xl font-bold text-indigo-700 mb-4">No Appointment Selected</h3>
            <p>Please book an appointment to see the details here.</p>

            {/* Display the BookAppointment form */}
            <BookAppointment
              providers={providers}
              services={services}
              onSubmit={onSubmit}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AppointmentDetail;
