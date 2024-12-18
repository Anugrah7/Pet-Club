import React from 'react';

function MyServices() {
  const services = [
    { id: 1, name: 'Dog Grooming', description: 'Includes bathing, haircut, and styling.' },
    { id: 2, name: 'Obedience Training', description: 'Training for basic commands and good behavior.' },
    { id: 3, name: 'Routine Check-up', description: 'Regular check-ups to ensure your pet is healthy.' },
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">My Services</h2>
      {services.map((service) => (
        <div key={service.id} className="p-4 bg-gray-50 rounded-lg shadow-sm mb-4">
          <h3 className="text-lg font-semibold">{service.name}</h3>
          <p className="text-gray-600">{service.description}</p>
        </div>
      ))}
    </div>
  );
}

export default MyServices;
