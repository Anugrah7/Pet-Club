import React, { useEffect } from 'react';
import { getBookingAPI } from '../../../Services/allAPI';
import { use } from 'react';

function Bookings() {
  const [bookings, setBookings] = React.useState([]);
  // const bookings = [
  //   {
  //     id: 1,
  //     ownerName: 'John Doe',
  //     petName: 'Max',
  //     service: 'Dog Grooming',
  //     date: '2024-12-20',
  //     time: '10:00 AM',
  //     status: 'Pending',
  //   },
  //   {
  //     id: 2,
  //     ownerName: 'Jane Smith',
  //     petName: 'Bella',
  //     service: 'Routine Check-up',
  //     date: '2024-12-22',
  //     time: '2:00 PM',
  //     status: 'Confirmed',
  //   },
  // ];

  const getBookingData = async () => {
    // Fetch booking data from the backend
    const token = sessionStorage.getItem('token');
    const reqHeader = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    const reqBody = {
      username : sessionStorage.getItem("user").username
    };
    const result = await getBookingAPI(reqBody,reqHeader);
    if (result.status === 200) {
      setBookings(result.data);
    } else {
      console.error('Failed to fetch bookings:', result);
    }
  }
  useEffect(() => {
    getBookingData();
  },[]);
  const handleAction = (id, action) => {
    console.log(`Booking ${id} has been ${action}.`); // Placeholder logic
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Bookings</h2>
      {bookings.map((booking) => (
        <div key={booking.id} className="p-4 bg-gray-50 rounded-lg shadow-sm mb-4">
          <h3 className="text-lg font-semibold">{booking.service}</h3>
          <p className="text-gray-600">
            Owner: {booking.ownerName} <br />
            Pet: {booking.petName} <br />
            Date: {booking.date} at {booking.time}
          </p>
          <div className="mt-4">
            {booking.status === 'Pending' ? (
              <div className="flex gap-4">
                <button
                  onClick={() => handleAction(booking.id, 'accepted')}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleAction(booking.id, 'rejected')}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            ) : (
              <span className="text-sm text-gray-500">Status: {booking.status}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Bookings;
