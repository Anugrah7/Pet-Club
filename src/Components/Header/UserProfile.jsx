import React, { useState ,useEffect} from 'react';
import { Bell } from 'lucide-react';


function UserProfile() {

   const [username,SetUsername] = useState("")
  
    useEffect(()=>{
      if(sessionStorage.getItem("user")){
      SetUsername(JSON.parse(sessionStorage.getItem("user")).username.split(" ")[0])
      }  
    },[])

  
  return (
    <div className="flex items-center gap-4">
      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
        <Bell size={20} />
      </button>
      <div className="flex items-center gap-2">
        {/* <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
          alt="Profile"
          className="w-8 h-8 rounded-full"
        /> */}
        <span className="font-medium">{username}</span>
      </div>
    </div>
  );
}

export default UserProfile;