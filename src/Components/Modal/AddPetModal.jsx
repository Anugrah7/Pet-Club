import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

function AddPetModal({ isOpen, onClose, onSubmit }) {
  const [petData, setPetData] = useState({
    name: '',
    type: '',
    age: '',
    medicalHistory: '',
    image: null,
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(petData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Pet</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={petData.name}
              onChange={(e) => setPetData({ ...petData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pet Type</label>
            <select
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={petData.type}
              onChange={(e) => setPetData({ ...petData, type: e.target.value })}
              required
            >
              <option value="">Select type</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={petData.age}
              onChange={(e) => setPetData({ ...petData, age: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Medical History</label>
            <textarea
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={petData.medicalHistory}
              onChange={(e) => setPetData({ ...petData, medicalHistory: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pet Photo</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="pet-photo"
                onChange={(e) => setPetData({ ...petData, image: e.target.files?.[0] || null })}
              />
              <label htmlFor="pet-photo" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-1 text-sm text-gray-600">Click to upload or drag and drop</p>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Add Pet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPetModal;