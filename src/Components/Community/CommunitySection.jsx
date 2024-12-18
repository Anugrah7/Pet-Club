import React from 'react';
import { MessageSquare } from 'lucide-react';

function CommunitySection() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare size={20} className="text-indigo-600" />
        <h2 className="text-lg font-semibold">Community Updates</h2>
      </div>
      <div className="space-y-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Join our weekly pet care tips discussion!</p>
          <p className="text-xs text-gray-500 mt-1">Today at 7 PM</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">New pet nutrition workshop this weekend</p>
          <p className="text-xs text-gray-500 mt-1">Saturday at 2 PM</p>
        </div>
      </div>
    </div>
  );
}

export default CommunitySection;