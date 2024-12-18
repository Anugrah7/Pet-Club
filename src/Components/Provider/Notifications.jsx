import React, { useState } from 'react';

function Notifications() {
  const [notification, setNotification] = useState('');
  const [type, setType] = useState('');

  const handleSend = () => {
    console.log(`Notification sent: ${notification} (Type: ${type})`);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Send Notifications</h2>
      <div className="mb-4">
        <label className="block text-sm text-gray-500">Notification Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="">Select Type</option>
          <option value="Vaccination">Vaccination</option>
          <option value="Grooming">Grooming</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-500">Message:</label>
        <textarea
          value={notification}
          onChange={(e) => setNotification(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <button
        onClick={handleSend}
        className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
      >
        Send Notification
      </button>
    </div>
  );
}

export default Notifications;
