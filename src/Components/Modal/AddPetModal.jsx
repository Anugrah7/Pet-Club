import React, { useEffect, useState } from 'react';
import { X, Upload } from 'lucide-react';
import { addPetAPI } from '../../../Services/allAPI';

function AddPetModal({ isOpen, onClose, fetchPets }) {
  const [petData, setPetData] = useState({
    name: '',
    type: '',
    age: '',
    medicalHistory: '',
    petImage: '' // File object
  })
  const [imagePreview, setImagePreview] = useState(null);
  console.log(imagePreview)
  const [loading, setloading] = useState(false);
  
  const handleAddPet = async () => {
    const { name, type, age, medicalHistory } = petData;
    const image = localStorage.getItem('petImage');

    if (name && type && age && medicalHistory && image) {
      const reqBody = new FormData();
      reqBody.append('petName', name);
      reqBody.append('petType', type);
      reqBody.append('age', age);
      reqBody.append('medicalHistory', medicalHistory);
      reqBody.append('petImage', image)

      const token = sessionStorage.getItem('token');
      if (token) {
        const reqHeader = {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        };

        try {
          console.log('Request Body:', reqBody);
          if (!image) {
            console.error('Image file is missing');
            alert('Please upload a photo.');
            return;
          }          
          const result = await addPetAPI(reqBody, reqHeader);
          console.log('API Response:', result);

          if (result.status === 200 || result.status === 201) {
            alert(`${result?.data?.pet?.petName} added successfully!`);

            // Call fetchPets to refresh the pet list in OwnerDashboard
            fetchPets();  // Now fetchPets is available here

            // Reset the form and close the modal
            setPetData({
              name: '',
              type: '',
              age: '',
              medicalHistory: '',
              petImage: ''
            });
            setImagePreview(null);
            localStorage.removeItem('petImage');
            onClose(); // Close the modal
          } else {
            alert('Failed to add the pet. Please try again.');
          }
        } catch (err) {
          console.error('Error adding pet:', err);
          alert('An error occurred. Please check your input or try again later.');
        }
      } else {
        alert('Authentication failed. Please log in again.');
      }
    } else {
      alert('Please fill in all fields and upload a photo.');
    }
  }



  const handleImage = async(event) => {
    setloading(true)
    const file = event.target.files[0]
    console.log("File uploaded:", event.target.files)
    if(!file) return 
    const data = new FormData()
    console.log("mm",file)
    
    data.append("file",file)
    data.append("upload_preset","ml_default")
    data.append("cloud_name","dybaof8hd")

    const res =  await fetch("https://api.cloudinary.com/v1_1/dybaof8hd/image/upload",{
      method:"POST",
      body:data
    })

    const uploadedImageUrl = await res.json()
    console.log("hi heloooo",uploadedImageUrl.url);
    setImagePreview(uploadedImageUrl.url) 
    setloading(false)
  }
 
  

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Pet</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form className="space-y-4">
          {/* Pet Name Input */}
          <div>
            <label htmlFor="pet-name" className="block text-sm font-medium text-gray-700 mb-1">
              Pet Name
            </label>
            <input
              id="pet-name"
              type="text"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={petData.name}
              onChange={(e) => setPetData({ ...petData, name: e.target.value })}
              required
            />
          </div>

          {/* Pet Type Input */}
          <div>
            <label htmlFor="pet-type" className="block text-sm font-medium text-gray-700 mb-1">
              Pet Type
            </label>
            <select
              id="pet-type"
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

          {/* Pet Age Input */}
          <div>
            <label htmlFor="pet-age" className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              id="pet-age"
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={petData.age}
              onChange={(e) => setPetData({ ...petData, age: e.target.value })}
              required
            />
          </div>

          {/* Medical History Input */}
          <div>
            <label htmlFor="medical-history" className="block text-sm font-medium text-gray-700 mb-1">
              Medical History
            </label>
            <textarea
              id="medical-history"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={petData.medicalHistory}
              onChange={(e) => setPetData({ ...petData, medicalHistory: e.target.value })}
              rows={3}
              required
            />
          </div>

          {/* Pet Photo Input */}
          <div>
            <label htmlFor="pet-photo" className="block text-sm font-medium text-gray-700 mb-1">
              Pet Photo
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="pet-photo"
                onChange={handleImage}
              />
              <label htmlFor="pet-photo" className="cursor-pointer text-indigo-500">
                <Upload size={24} />
                <span>Upload Photo</span>
              </label>
            </div>

            {loading ? (
                <div className="mt-4 text-indigo-500">
                  <span>Loading...</span> {/* Replace this with a spinner if needed */}
                </div>
              ) : (
                imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Pet preview"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                )
              )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent form submission
              handleAddPet();  // Call handleAddPet to submit the form
            }}
            type="button"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add Pet
          </button>
        </form>
      </div>
      <div>
      </div>
    </div>
  ) : null;
}

export default AddPetModal;
