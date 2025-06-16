import React from 'react';
import { Plus, MessageSquare, Menu, User, Settings, LogOut } from 'lucide-react';

// Sidebar Component
const Sidebar = ({ isOpen, conversations, onNewChat, onConversationSelect }) => {
  return (
    <div className={`${isOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-gray-900 text-white flex flex-col overflow-hidden`}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-700">
        <button 
          onClick={onNewChat}
          className="flex items-center space-x-2 w-full p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <Plus size={18} />
          <span className="text-sm font-medium">New Chat</span>
        </button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onConversationSelect(conv.id)}
              className={`flex items-center space-x-3 w-full p-3 rounded-lg text-left hover:bg-gray-800 transition-colors ${
                conv.active ? 'bg-gray-800' : ''
              }`}
            >
              <MessageSquare size={16} />
              <span className="text-sm truncate">{conv.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sidebar Footer */}
      <SidebarFooter />
    </div>
  );
};

// Sidebar Footer Component
const SidebarFooter = () => {
  return (
    <div className="p-2 border-t border-gray-700">
      <div className="space-y-1">
        <button className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-800 transition-colors">
          <User size={16} />
          <span className="text-sm">Profile</span>
        </button>
        <button className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-800 transition-colors">
          <Settings size={16} />
          <span className="text-sm">Settings</span>
        </button>
        <button className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-800 transition-colors">
          <LogOut size={16} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};


export default Sidebar;