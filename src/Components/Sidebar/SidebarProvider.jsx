import React from 'react';
import { LogOut, PawPrint } from 'lucide-react';
import { SidebarContentProvider } from './SidebarContentProvider'; // Adjust path as needed
import MenuItem from './MenuItem';

function SidebarProvider() {
  return (
    <div className="bg-indigo-700 text-white h-screen w-64 fixed left-0 top-0 p-4 overflow-y-auto">
      {/* Sidebar Header */}
      <div className="flex items-center gap-2 mb-8">
        <PawPrint size={20} />
        <h1 className="text-xl font-bold">Provider Dashboard</h1>
      </div>

      {/* Sidebar Navigation */}
      <nav className="space-y-2">
        {Object.values(SidebarContentProvider).map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </nav>

      {/* Logout Section */}
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

export default SidebarProvider;
