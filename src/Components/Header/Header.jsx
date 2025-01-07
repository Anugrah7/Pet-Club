import React, { useEffect, useState } from 'react';
import UserProfile from './UserProfile';

function Header() {
  const [username,SetUsername] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("user")){
    SetUsername(JSON.parse(sessionStorage.getItem("user")).username.split(" ")[0])
    }  
  },[])
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-gray-800">{username}'s Dashboard</h1>
      <UserProfile />
    </div>
  );
}

export default Header;