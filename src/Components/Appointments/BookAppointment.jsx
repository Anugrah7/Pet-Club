import React, { useState } from 'react';

function BookAppointment({ providers = [], services = [], onSubmit }) {
  const [selectedService, setSelectedService] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleSubmit = () => {
    const appointment = {
      service: selectedService,
      provider: selectedProvider,
      date: selectedDate,
      time: selectedTime,
    };

    // Pass the appointment data to parent for saving in the backend or state
    onSubmit(appointment);
  };

  // Define available services (this can come from props or backend)
  const availableServices = [
    { id: 1, name: 'Grooming' },
    { id: 2, name: 'Veterinary' },
    { id: 3, name: 'Training' },
  
  ];

  // Define available providers, with each provider linked to a specific service type
  const availableProviders = [
    { id: 1, name: 'John\'s Dog Grooming', serviceType: 'Grooming' },
    { id: 2, name: 'Happy Tails Vet Clinic', serviceType: 'Veterinary' },
    { id: 3, name: 'Pawsitive Pup Training', serviceType: 'Training' },
    { id: 4, name: 'Mobile Grooming Express', serviceType: 'Grooming' },
    { id: 5, name: 'Canine Care Vet', serviceType: 'Veterinary' },
    { id: 6, name: 'Behavioral Paws Training', serviceType: 'Training' },
  ];

  // Filter providers based on the selected service
  const filteredProviders = availableProviders.filter(
    (provider) => provider.serviceType === selectedService
  );

  return (
    <div className="p-10 bg-indigo-500 shadow-md  rounded-lg max-w-2xl mx-auto mt-10">
      <h2 className="text-4xl font-bold text-white mb-4">Book an Appointment</h2>

      <div className="mb-4 ">
        <label className="block text-lg text-white">Service:</label>
        <select
          className="w-full px-4 py-2 border rounded-md"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option value="">Select Service</option>
          {availableServices.map((service) => (
            <option key={service.id} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-lg text-white">Provider:</label>
        <select
          className="w-full px-4 py-2 border rounded-md"
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value)}
          disabled={!selectedService} // Disable provider dropdown if no service is selected
        >
          <option value="">Select Provider</option>
          {filteredProviders.length > 0 ? (
            filteredProviders.map((provider) => (
              <option key={provider.id} value={provider.name}>
                {provider.name}
              </option>
            ))
          ) : (
            <option value="">No providers available</option>
          )}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-lg text-white">Date:</label>
        <input
          type="date"
          className="w-full px-4 py-2 border rounded-md"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg text-white">Time:</label>
        <input
          type="time"
          className="w-full px-4 py-2 border rounded-md"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 transition duration-300"
        disabled={!selectedProvider || !selectedDate || !selectedTime} // Disable the button if not all fields are filled
      >
        Book Appointment
      </button>
    </div>
  );
}

export default BookAppointment;
