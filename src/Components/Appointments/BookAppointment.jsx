import React, { useState, useEffect } from 'react';
import { getServicesAPI, getProvidersAPI, addBookingAPI } from '../../../Services/allAPI'; // Assuming these are the correct API imports

function BookAppointment() {
  const [selectedService, setSelectedService] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [services, setServices] = useState([]);
  const [providers, setProviders] = useState([]);

  // Fetch services and providers on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the token
        const token = sessionStorage.getItem('token');
        const reqHeader = {
          'Authorization': `Bearer ${token}`,
        };

        // Fetch services
        const serviceResponse = await getServicesAPI(reqHeader);
        setServices(serviceResponse.data); // Assuming the response has the data

        // Fetch providers
        const providerResponse = await getProvidersAPI(reqHeader);
        setProviders(providerResponse.data); // Assuming the response has the data
      } catch (error) {
        console.error('Failed to fetch services or providers:', error);
      }
    };

    fetchData();
  }, []);

  

  const filteredProviders = providers.filter(provider => 
    provider.services.includes(selectedService)
  );
  
  console.log(filteredProviders);
  
  const handleSubmit = async () => {
    const appointment = {
      service: [selectedService],
      provider: selectedProvider, // providerId (from selected provider)
      date: new Date(`${selectedDate}T${selectedTime}:00.000Z`).toISOString(), // Combined date and time
      time: selectedTime,
      bookingStatus: 0, // Default status
    };

    if (!selectedService) {
      alert('Please select a service.');
      return;
  }

    console.log("Submitting booking:",appointment);
    

    const token = sessionStorage.getItem('token');
    const reqHeader = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    const result = await addBookingAPI(appointment, reqHeader);

    if (result.status === 200 || result.status === 201) {
      alert('Appointment booked successfully!');
    } else {
      alert('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div className="p-10 bg-indigo-500 shadow-md rounded-lg max-w-2xl mx-auto mt-10">
      <h2 className="text-4xl font-bold text-white mb-4">Book an Appointment</h2>

      {/* Service Dropdown */}
      <div className="mb-4">
        <label className="block text-lg text-white">Service:</label>
        <select
          className="w-full px-4 py-2 border rounded-md"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option value="">Select Service</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      {/* Provider Dropdown */}
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
              <option key={provider._id} value={provider._id}> {/* Use provider _id for API */}
                {provider.name}
              </option>
            ))
          ) : (
            <option value="">No providers available</option>
          )}
        </select>
      </div>

      {/* Date Input */}
      <div className="mb-4">
        <label className="block text-lg text-white">Date:</label>
        <input
          type="date"
          className="w-full px-4 py-2 border rounded-md"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Time Input */}
      <div className="mb-4">
        <label className="block text-lg text-white">Time:</label>
        <input
          type="time"
          className="w-full px-4 py-2 border rounded-md"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 transition duration-300"
        disabled={!selectedProvider || !selectedDate || !selectedTime} // Disable button if not all fields are filled
      >
        Book Appointment
      </button>
    </div>
  );
}

export default BookAppointment;