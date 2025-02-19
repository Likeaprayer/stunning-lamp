// src/components/common/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Image, Users, Calendar, Settings } from 'lucide-react';

export function Sidebar() {
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Image, label: 'Artworks', path: '/artworks' },
    { icon: Users, label: 'Staff', path: '/staff' },
    { icon: Calendar, label: 'Shifts', path: '/shifts' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r">
      <div className="p-4">
        <h2 className="text-xl font-bold">Museum Admin</h2>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <item.icon className="h-5 w-5 mr-2" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
