import React, { useState } from 'react';
import { PawPrint, LogOut } from 'lucide-react';
import MenuItem from './MenuItem';
import { sidebarContent } from './SidebarContent';

function Sidebar({ pets }) {
  return (
    <div className="bg-indigo-700 text-white h-screen w-64 fixed left-0 top-0 p-4 overflow-y-auto">
      <div className="flex items-center gap-2 mb-8">
        <PawPrint size={20} />
        <h1 className="text-xl font-bold">PetClub</h1>
      </div>

      <nav className="space-y-2">
        {Object.values(sidebarContent(pets) || {}).map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            label={item.label}
            subItems={item.subItems}
          />
        ))}
      </nav>

      <div className="absolute bottom-4 w-full left-0 px-4">
        <MenuItem
          icon={<LogOut size={20} />}
          label="Logout"
          className="text-red-300 hover:bg-red-500 hover:text-white"
        />
      </div>
    </div>
  );
}

export default Sidebar;
