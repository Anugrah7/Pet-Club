import React from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Stethoscope, Syringe, Clock } from 'lucide-react';
import Sidebar from '../Sidebar/Sidebar';


function PetDetails({ pets =[]}) {
  const { petId } = useParams(); // Extract petId from URL

  // Find the pet by petId
  const pet = pets.find((pet) => pet.petId === petId);

  if (!pet) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <p className="text-gray-600 text-center mt-10 w-full">Pet not found.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:block bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto p-6 mr-2">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Pet Image Section */}
            <div className="md:w-1/3">
              <div className="relative group">
                <img
                  src={pet?.petImage || 'https://example.com/default-image.png'} // Use pet's image
                  alt="Pet"
                  className="w-full h-96 object-cover rounded-2xl shadow-md transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-2xl">
                  <h2 className="text-2xl font-bold text-white">
                    {pet?.petName || 'Unknown Pet'}
                  </h2>
                </div>
              </div>
            </div>

            {/* Pet Details Section */}
            <div className="md:w-2/3 space-y-8">
              {/* Basic Information */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-5 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                    <div className="flex items-center gap-2 text-indigo-600 mb-2">
                      <Clock size={20} />
                      <span className="font-medium">Age</span>
                    </div>
                    <p className="text-gray-700">{pet?.age || 'Unknown Age'}</p>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                    <div className="flex items-center gap-2 text-indigo-600 mb-2">
                      <Calendar size={20} />
                      <span className="font-medium">Next Checkup</span>
                    </div>
                    <p className="text-gray-700">{pet?.nextCheckup || 'TBD'}</p>
                  </div>
                </div>
              </div>

              {/* Medical History */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Stethoscope className="text-indigo-600" size={24} />
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Medical History
                  </h3>
                </div>
                <div className="bg-gray-50 p-5 rounded-lg shadow-sm hover:bg-gray-100 transition duration-300">
                  <p className="text-gray-700">
                    {pet?.medicalHistory || 'No medical history recorded.'}
                  </p>
                </div>
              </div>

              {/* Vaccination History */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Syringe className="text-indigo-600" size={24} />
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Vaccination History
                  </h3>
                </div>
                <div className="space-y-4">
                  {pet?.vaccines?.length > 0
                    ? pet.vaccines.map((vaccine, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 p-5 rounded-lg flex justify-between items-center hover:bg-gray-100 transition duration-300"
                        >
                          <div>
                            <p className="font-medium text-gray-800">
                              {vaccine.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Last: {vaccine.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Next due:</p>
                            <p className="text-sm font-semibold text-indigo-600">
                              {vaccine.nextDue}
                            </p>
                          </div>
                        </div>
                      ))
                    : 'No vaccination history available.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetDetails;
