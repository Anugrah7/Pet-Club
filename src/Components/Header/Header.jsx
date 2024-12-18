import React from 'react';
import UserProfile from './UserProfile';

function Header() {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-gray-800">Owner Dashboard</h1>
      <UserProfile />
    </div>
  );
}

export default Header;