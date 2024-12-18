import React, { useState } from 'react';


function MenuItem({ icon, label, subItems,  className = '' }) {
  const [isOpen, setIsOpen] = useState(false);

  

  return (
    <div className="mb-2">
      <div
        
        className={`flex items-center justify-between p-3 rounded-lg hover:bg-indigo-500 cursor-pointer transition-colors ${className}`}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{label}</span>
        </div>
       
      </div>
    </div>
  );
}

export default MenuItem;